<!-- bear witness to my beautiful spaghetti code -->

<script setup lang="ts">
import JSZip from "jszip";
import { ref, useTemplateRef } from "vue";

const name = ref<string>("");
const description = ref<string>("");
const version = ref<string>("0.0.0");
const website = ref<string>("");
const readme = ref<string>("");
const changelog = ref<string | null>(null);

const zipSelector = useTemplateRef("zip-selector");
const zip = ref<File | null>(null);

const dllSelector = useTemplateRef("dll-selector");
const dll = ref<File | null>(null);
const dllurl = ref<string | null>(null);

const imgSelector = useTemplateRef("img-selector");
const image = ref<string | null>(null);
const imageFile = ref<File | null>(null);

const dependencies = ref<string[]>(["BepInEx-BepInExPack-5.4.2305"]);

interface PackageManifest {
	name: string;
	description: string;
	version_number: string;
	dependencies: string[];
	website_url: string;
}

function fileToDataURL(file: File) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = () => resolve(reader.result);
		reader.onerror = () => reject(reader.error);

		reader.readAsDataURL(file);
	});
}

function processImg(file: File) {
	const reader = new FileReader();
	reader.onload = (e) => {
		const img = new Image();
		img.onload = () => {
			const canvas = document.createElement("canvas");
			canvas.width = 256;
			canvas.height = 256;

			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				image.value = canvas.toDataURL("image/png");
			}
		};
		img.src = e.target?.result as string;
	};
	reader.readAsDataURL(file);
}

async function zipPackage() {
	const manifest: PackageManifest = {
		name: name.value,
		description: description.value,
		version_number: version.value,
		dependencies: dependencies.value,
		website_url: website.value,
	};

	const zip = new JSZip();

	zip.file("manifest.json", JSON.stringify(manifest));

	zip.file("icon.png", (image.value as string).split(",")[1], {
		base64: true,
	});

	zip.file("README.md", readme.value);

	zip.file((dll.value as File).name, (dllurl.value as string).split(",")[1], {
		base64: true,
	});

	if (changelog.value != null) {
		zip.file("CHANGELOG.md", changelog.value);
	}

	const zipBlob = await zip.generateAsync({ type: "blob" });

	const url = URL.createObjectURL(zipBlob);
	const link = document.createElement("a");
	link.href = url;
	link.download = "package.zip";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}

async function fromZip(file: File) {
	const zip = new JSZip();
	const contents = await zip.loadAsync(file);

	for (const [filename, fileData] of Object.entries(contents.files)) {
		if (!fileData.dir) {
			switch (filename) {
				case filename.match(/manifest\.json/)?.input:
					const manifest: PackageManifest = JSON.parse(
						await fileData.async("string"),
					) as PackageManifest;
					name.value = manifest.name;
					((description.value = manifest.description),
						(dependencies.value = manifest.dependencies),
						(website.value = manifest.website_url),
						(version.value = manifest.version_number));
					break;
				case filename.match(/README\.md/)?.input:
					readme.value = await fileData.async("string");
					break;
				case filename.match(/CHANGELOG\.md/)?.input:
					changelog.value = await fileData.async("string");
				case filename.match(/icon\.png/)?.input:
					const zimg = await fileData.async("blob");
					imageFile.value = new File([zimg], filename, {
						type: zimg.type,
						lastModified: Date.now(),
					});
					fileToDataURL(imageFile.value).then(
						(r) => (image.value = r as string),
					);
				case filename.match(/.*\.dll/)?.input:
					const zdll = await fileData.async("blob");
					dll.value = new File([zdll], filename, {
						type: zdll.type,
						lastModified: Date.now(),
					});
					dllurl.value = (await fileToDataURL(dll.value)) as string
			}
		}
	}
}

function formatSize(bytes: number) {
	if (bytes > 1000000000) {
		return `${(bytes / 1000000000).toFixed(2)} GB`;
	}
	if (bytes > 1000000) {
		return `${(bytes / 1000000).toFixed(2)} MB`;
	}
	if (bytes > 1000) {
		return `${(bytes / 1000).toFixed(2)} kB`;
	}
	return `${bytes.toFixed(2)} B`;
}
</script>

<template>
	<h2>Modify Package</h2>
	<p>
		If you already made a package and want to modify it, upload the zip
		file.
	</p>
	<input
		ref="zip-selector"
		type="file"
		accept="application/zip"
		multiple="false"
		hidden
		@change="
			(event) => {
				const target = event.target as HTMLInputElement;

				if (target.files && target.files.length > 0) {
					zip = target.files[0];

					fromZip(zip);
				} else {
					zip = null;
				}
			}
		"
	/>
	<button @click="zipSelector?.click()">Upload Package to Modify</button>
	<h2>Name</h2>
	<p>
		The name of the mod without spaces. Names must be alphanumeric and can
		be up to 128 characters long. If you want to add a space to your mod
		name, use an underscore as it is typically replaced by a space on the
		Thunderstore website.
	</p>
	<input
		type="text"
		id="name"
		v-model="name"
		placeholder="Mod name..."
		maxlength="128"
		minlength="1"
		@input="
			(event) => {
				const target = event.target as HTMLInputElement;
				const sanitized = target.value
					.replace(/ /g, '_')
					.replace(/[^a-zA-Z0-9_]/g, '');
				name = sanitized;
				target.value = sanitized;
			}
		"
	/>
	<h2>Description</h2>
	<p>
		A short description of your mod, typically shown in mod managers or the
		Thunderstore mod browser, and can be up to 250 characters.
	</p>
	<textarea
		type="text"
		id="desc"
		placeholder="Mod description..."
		maxlength="128"
		minlength="1"
		v-model="description"
		@input="
			(event) => {
				const target = event.target as HTMLInputElement;
				description = target.value;
			}
		"
	/>
	<div class="row">
		<div class="expand">
			<h2>Icon</h2>
			<p>
				The icon of your mod. The image is automatically converted to a
				512x512 PNG.
			</p>
			<input
				ref="img-selector"
				type="file"
				accept="image/*"
				multiple="false"
				hidden
				@change="
					(event) => {
						const target = event.target as HTMLInputElement;

						if (target.files && target.files.length > 0) {
							imageFile = target.files[0];

							processImg(imageFile);
						} else {
							imageFile = null;
						}
					}
				"
			/>
			<button @click="imgSelector?.click()">
				{{
					imageFile == null
						? "Upload Icon"
						: `${imageFile.name} (${formatSize(imageFile.size)})`
				}}
			</button>
		</div>
		<img
			class="icon-display"
			v-if="image != null"
			:src="image || ''"
			alt=""
		/>
	</div>
	<h2>Version</h2>
	<p>
		The version of the mod package. This must be in the 3-numbered
		<a href="https://semver.org/" rel="noreferrer" target="_blank"
			>semantic versioning format</a
		>. Make sure you increment this number to ensure Thunderstore shows it
		as the latest version.
	</p>
	<input
		type="text"
		id="name"
		placeholder="Mod version..."
		minlength="1"
		v-model="version"
		@input="
			(event) => {
				const target = event.target as HTMLInputElement;
				const sanitized = target.value.replace(/[^0-9.]/g, '');
				version = sanitized;
				target.value = sanitized;
			}
		"
	/>
	<h2>Website</h2>
	<p>
		An external website link related to your mod. If your mod is open
		source, it's recommended to put a link to your code (Git repository,
		zipped project folder, etc.)
	</p>
	<input
		type="text"
		v-model="website"
		placeholder="Website..."
		@input="
			(event) => {
				const target = event.target as HTMLInputElement;
				website = target.value;
			}
		"
	/>
	<h2>README</h2>
	<p>
		A longer description of your mod. A README can be helpful for
		instructions, demonstrations, and explanations. Markdown is supported.
	</p>
	<textarea
		type="text"
		id="desc"
		placeholder="Mod README..."
		minlength="1"
		:value="readme"
		@input="
			(event) => {
				const target = event.target as HTMLInputElement;
				readme = target.value;
			}
		"
	/>
	<div v-if="changelog !== null">
		<h2>Changelog</h2>
		<p>
			A list of the mod's changes since the last update. Markdown is
			supported.
		</p>
		<textarea
			type="text"
			id="desc"
			placeholder="Mod changelog..."
			:value="changelog"
			@input="
				(event) => {
					const target = event.target as HTMLInputElement;
					changelog = target.value;
				}
			"
		/>
	</div>
	<button @click="changelog = changelog == null ? '' : null">
		{{ changelog == null ? "Add" : "Remove" }} Changelog
	</button>
	<h2>Mod File</h2>
	<p>
		The <code>.dll</code> file of your mod, created by
		<a href="/create/your-first-mod#building-and-running"
			>building your mod</a
		>.
	</p>
	<input
		ref="dll-selector"
		type="file"
		accept=".dll"
		multiple="false"
		hidden
		@change="
			(event) => {
				const target = event.target as HTMLInputElement;

				if (target.files && target.files.length > 0) {
					dll = target.files[0];

					fileToDataURL(dll).then((r) => (dllurl = r as string));
				} else {
					dll = null;
				}
			}
		"
	/>
	<button @click="dllSelector?.click()">
		{{
			dll == null ? "Upload Mod" : `${dll.name} (${formatSize(dll.size)})`
		}}
	</button>
	<h2>Dependencies</h2>
	<p>
		Thunderstore package IDs of your dependencies. BepInEx is automatically
		added as a dependency.
	</p>
	<div v-for="(dependency, index) in dependencies" :key="index">
		<div class="row listitem">
			<input
				type="text"
				id="name"
				placeholder="Mod dependency..."
				minlength="1"
				v-model="dependencies[index]"
			/>
			<button class="delete" @click="dependencies.splice(index, 1)">
				X
			</button>
		</div>
	</div>
	<button @click="dependencies.push('')">Add Dependency</button>
	<h2>Package</h2>
	<button
		:disabled="
			name == '' ||
			description == '' ||
			image == null ||
			version == '' ||
			readme == '' ||
			dllurl == null
		"
		@click="zipPackage()"
	>
		Download Mod Package
	</button>
	<div
		class="danger custom-block"
		v-if="
			name == '' ||
			description == '' ||
			image == null ||
			version == '' ||
			readme == '' ||
			dllurl == null
		"
	>
		<p class="custom-block-title">ERROR</p>
		<p>
			Some required fields are incomplete. Fill them out before packaging.
		</p>
	</div>
</template>

<style scoped>
input[type="text"],
textarea {
	background-color: var(--vp-c-bg-alt);
	width: 100%;
	font-size: inherit;
	padding: 11px 16px 13px 16px;
	border-radius: 8px;
	border: 1px solid var(--vp-c-divider);
	transition: border-color 0.25s;
}

input[type="text"]:hover,
textarea:hover {
	border-color: var(--vp-c-brand-1);
}

.listitem {
	margin-top: 8px;
}

textarea {
	min-height: 3rem;
	height: 10rem;
	max-height: 10rem;
}

div.row {
	display: flex;
	width: 100%;
	gap: 10px;
	align-items: end;
}

.icon-display {
	height: 10rem;
	border: none;
	border-radius: 8px;
	background-color: var(--vp-c-divider);
	aspect-ratio: 1 / 1;
	margin-top: 0;
	margin-bottom: 0;
}

button {
	border-color: var(--vp-button-brand-border);
	color: var(--vp-button-brand-text);
	background-color: var(--vp-button-brand-bg);
	padding: 8px 26px 8px 26px;
	margin-top: 12px;
	width: 100%;
	border-radius: 8px;
	transition:
		color 0.25s,
		border-color 0.25s,
		background-color 0.25s;
	font-size: 0.9rem;
	font-weight: 600;
}

button:disabled {
	opacity: 0.6;
	cursor: not-allowed;
}

button:disabled:hover {
	border-color: var(--vp-button-brand-border);
	color: var(--vp-button-brand-text);
	background-color: var(--vp-button-brand-bg);
}

button.delete {
	background-color: var(--vp-c-danger-1);
	width: 3.5rem;
	padding: 0;
	margin-top: 0;
	min-height: 3rem;
	font-size: 1em;
	font-weight: normal;
}

button.delete:hover {
	background-color: var(--vp-c-danger-2);
}

.expand {
	flex: 1;
}

button:hover {
	border-color: var(--vp-button-brand-hover-border);
	color: var(--vp-button-brand-hover-text);
	background-color: var(--vp-button-brand-hover-bg);
}
</style>
