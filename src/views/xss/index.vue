<template>
	<div v-html="text"></div>
	<div v-html="textContent(text)"></div>
</template>

<script setup lang="ts">
// let xssVar = "<p href='#'>sfsdf</p>"

let text: string;
text = "<a onmouseover=alert(document.cookie)>click me!</a>";
const textContent = (html: string) => {
	const txt = document.createElement("div");
	txt.innerHTML = html;
	return txt.textContent;
};
</script>

<style></style>
