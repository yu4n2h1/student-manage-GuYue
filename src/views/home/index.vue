<template>
	<a-card title="工作台" :bordered="false" :bodyStyle="{ padding: '15px' }" class="mb-6">
		<a-row>
			<a-col :span="12">
				<div class="flx-align-center">
					<a-avatar :size="{ md: 42, xl: 52, xxl: 64 }">
						<template #icon>
							<img alt="avatar" src="@/assets/images/avatar.jpg" />
						</template>
					</a-avatar>
					<div>
						<p class="px-16 text-title">
							<span>{{ time }}</span
							>，{{ username }}，开始您一天的学习吧！
						</p>
						<p class="px-16 text-gray">今日阴转大雨，17℃ - 28℃，出门记得带伞哦。</p>
					</div>
				</div>
			</a-col>
			<a-col :span="12" class="flx-justify-between">
				<a-card :bordered="false" :bodyStyle="{ padding: '6px' }">
					<p class="count-text">课程数</p>
					<a-typography-text strong class="info-size">
						<CountUp :end="2" :options="{ prefix: '' }"></CountUp>
					</a-typography-text>
				</a-card>
				<a-card :bordered="false" :bodyStyle="{ padding: '6px' }">
					<p class="count-text">完成实验/所有实验</p>
					<a-typography-text strong class="info-size">
						<CountUp :end="18" :options="{ prefix: '' }"></CountUp>/<CountUp :end="25" :options="{ prefix: '' }"> </CountUp>
					</a-typography-text>
				</a-card>
				<a-card :bordered="false" :bodyStyle="{ padding: '6px' }">
					<p class="count-text">消息</p>
					<a-typography-text strong class="info-size">
						<CountUp :end="1" :options="{ prefix: '' }"></CountUp>
					</a-typography-text>
				</a-card>
			</a-col>
		</a-row>
	</a-card>
	<a-row :gutter="6">
		<!-- 工程项目 -->
		<a-col :span="12">
			<a-card title="工程项目" class="mb-6">
				<template #extra><a href="" target="_blank">更多项目</a></template>
				<a-card-grid v-for="item in projectData" :key="item.title">
					<div class="flex flex-row">
						<component :is="item.icon" :style="{ fontSize: '30px', color: item.color }"></component>
						<span class="project-text">
							<a-anchor-link :href="item.link" :title="item.title" target="_blank" />
						</span>
					</div>
					<div class="flex mt-8 text-gray" style="height: 40px; overflow: hidden">{{ item.desc }}</div>
					<div class="flex mt-8 text-gray" style="height: 20px; overflow: hidden; font-size: 12px; color: rgb(0 0 0 / 25%)">
						{{ item.author }}
					</div>
				</a-card-grid>
			</a-card>
			<!-- 动态 -->
			<a-card title="动态" :bordered="false" :bodyStyle="{ paddingTop: 0, paddingBottom: 0 }">
				<a-list item-layout="horizontal" :data-source="dynamicData">
					<template #renderItem="{ item }">
						<a-list-item>
							<a-list-item-meta :description="item.desc">
								<template #title>
									<a :href="item.link" target="_blank">{{ item.title }}</a>
								</template>
								<template #avatar>
									<a-avatar :size="40">
										<template #icon>
											<img alt="avatar" src="@/assets/images/avatar.jpg" />
										</template>
									</a-avatar>
								</template>
							</a-list-item-meta>
						</a-list-item>
					</template>
				</a-list>
			</a-card>
		</a-col>
		<!-- 快捷操作 -->
		<a-col :span="12">
			<a-card title="快捷操作" class="mb-6">
				<a-card-grid
					style="padding: 12px; text-align: center"
					v-for="item in shortcutKeyList"
					:key="item.title"
					class="shortcut-key"
				>
					<div class="flex justify-center flex-col" @click="item.onClick">
						<span>
							<component :is="item.icon" :style="{ fontSize: '26px', color: item.color }"></component>
						</span>
						<span class="title">{{ item.title }}</span>
					</div>
				</a-card-grid>
			</a-card>
			<!-- Gitee / GitHub 访问量占比 -->
			<a-card title="程序设计 / 网络安全 占比" :bodyStyle="{ height: '350px' }">
				<div class="book-echarts">
					<Pie ref="pieRef" />
				</div>
			</a-card>
		</a-col>
	</a-row>
</template>

<script setup lang="ts" name="home">
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "@/stores/modules/user";
import { getTimeState } from "@/utils/util";
import { useRouter } from "vue-router";
import Pie from "./components/pie.vue";
import CountUp from "@/components/CountUp/index.vue";

interface DataItem {
	id: string;
	title: string;
	link: string;
	desc: string;
}

interface ShortcutKeyItem {
	icon: string;
	title: string;
	color: string;
	onClick: () => void;
}

interface ShortcutKeyItem {
	icon: string;
	title: string;
	color: string;
	onClick: () => void;
}

interface ProjectItem {
	icon: string;
	title: string;
	desc: string;
	author: string;
	color: string;
	link?: string;
}

const router = useRouter();
const userStore = useUserStore();
const username = computed(() => userStore.userInfo.name);
const time = computed(() => getTimeState());
const pieRef = ref();

/* 快捷键 */
const shortcutKeyList: ShortcutKeyItem[] = [
	{
		icon: "FundViewOutlined",
		title: "主控台",
		color: "#68c755",
		onClick: () => {
			router.push("/dashboard/dataVisualize");
		}
	},
	{
		icon: "BookOutlined",
		title: "课程",
		color: "#fab558",
		onClick: () => {
			router.push("/table/course");
		}
	},
	{
		icon: "LockOutlined",
		title: "实验",
		color: "#3da2ff",
		onClick: () => {
			router.push("/table/experimentitem");
		}
	},
	{
		icon: "BarChartOutlined",
		title: "数据大屏",
		color: "#f387aa",
		onClick: () => {
			router.push("/dataScreen");
		}
	},
	{
		icon: "ProjectOutlined",
		title: "关于项目",
		color: "#814dd6",
		onClick: () => {
			router.push("/about/index");
		}
	},
	{
		icon: "MailOutlined",
		title: "内嵌页面",
		color: "#5cdbd3",
		onClick: () => {
			router.push("/dashboard/embedded");
		}
	}
];
/* 动态 */
const dynamicData: DataItem[] = [
	{
		id: "1",
		title: "组织复杂数据",
		link: "",
		desc: "掌握结构体和复杂数据组织方法"
	},
	{
		id: "2",
		title: "OSPF路由项欺骗攻击和防御",
		link: "",
		desc: "掌握OSPF路由项欺骗攻击和防御"
	},
	{
		id: "3",
		title: "数据存储与程序组织结构",
		link: "",
		desc: "使用函数、数组和字符串和指针的案例6"
	},
	{
		id: "4",
		title: "VLAN防MAC地址欺骗攻击",
		link: "",
		desc: "掌握VLAN防MAC地址欺骗攻击原理和过程"
	},
	{
		id: "5",
		title: "数据的顺序组织",
		link: "",
		desc: "使用数组（串）和指针"
	},
	{
		id: "6",
		title: "防生成树欺骗攻击",
		link: "",
		desc: "掌握防生成树欺骗攻击原理和过程"
	}
];
/* 工程项目 */
const projectData: ProjectItem[] = [
	{
		icon: "GithubOutlined",
		title: "程序设计实验",
		desc: "",
		author: "c语言也算语言",
		color: "#333639",
		link: ""
	},
	{
		icon: "GitlabOutlined",
		title: "网络安全实验",
		desc: "",
		author: "学不动也要学",
		color: "#47ba86",
		link: ""
	},
	{
		icon: "Html5Outlined",
		title: "web开发和安全",
		desc: "",
		author: "撸码也是一种艺术",
		color: "#e4502c",
		link: ""
	}
];

const pieData = [
	{ value: 14, name: "程序设计实验" },
	{ value: 11, name: "网络安全实验" }
];

onMounted(() => {
	pieRef.value.initChart(pieData);
});
</script>

<style scoped lang="less">
@import url("./index.less");
</style>
