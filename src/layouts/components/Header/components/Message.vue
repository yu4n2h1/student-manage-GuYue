<template>
	<div class="message">
		<a-popover placement="bottom" trigger="click">
			<a-badge count="1" class="item message-guide-container">
				<i :class="'iconfont icon-xiaoxi'" class="toolBar-icon" id="messageGuide"></i>
			</a-badge>
			<template #content>
				<a-tabs v-model:activeKey="activeKey">
					<a-tab-pane key="inform" tab="通知(1)">
						<div class="message-list">
							<div class="message-item">
								<img src="@/assets/images/msg01.png" alt="" class="message-icon" />
								<div class="message-content">
									<span class="message-title">聂尚清</span>
									<span class="message-date">我喜欢你</span>
								</div>
							</div>
						</div>
					</a-tab-pane>
					<a-tab-pane key="message" tab="消息(0)" force-render>
						<div class="message-empty">
							<img src="@/assets/images/notData.png" alt="notData" />
							<div>暂无消息</div>
						</div>
					</a-tab-pane>
					<a-tab-pane key="todo" tab="代办(0)">
						<div class="message-empty">
							<img src="@/assets/images/notData.png" alt="notData" />
							<div>暂无代办</div>
						</div>
					</a-tab-pane>
				</a-tabs>
			</template>
		</a-popover>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeKey = ref("inform");
</script>

<style scoped lang="less">
.message-empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 284px;
	height: 260px;
	line-height: 45px;
}
.message-list {
	display: flex;
	flex-direction: column;
	.message-item {
		display: flex;
		align-items: center;
		width: 284px;
		padding: 20px 0;
		border-bottom: 1px solid #e4e7ed;
		&:last-child {
			border: none;
		}
		.message-icon {
			width: 40px;
			height: 40px;
			margin: 0 20px 0 5px;
		}
		.message-content {
			display: flex;
			flex-direction: column;
			.message-title {
				margin-bottom: 5px;
			}
			.message-date {
				font-size: 12px;
				color: #909309;
			}
		}
	}
}
</style>
