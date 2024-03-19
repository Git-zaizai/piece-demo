import type { RouteMeta } from 'vue-router'
import type { Component, VNodeChild } from 'vue'


/**
 * @interface navigation 自定义RouteMeta内容
 * */
export interface navigation {
    contentText: string
}

export interface Meta extends RouteMeta {
    keepAlive?: string
    title?: string
    navigation?: navigation,
    icon?: () => VNodeChild
}

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前 开始为 1
 * @param meta.frameSrc 外部页面
 *
 * */
export interface AppRouteRecordRaw {
    path: string;
    name: string;
    redirect?: string;
    meta?: Meta;
    component?: Component | string;
    children?: AppRouteRecordRaw[];
    fullPath?: string;
    sort?: number;
}