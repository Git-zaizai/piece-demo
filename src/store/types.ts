// import {RouteMeta} from "vue-router";
import {AppRouteRecordRaw} from '@/router/types';

export interface typetabs extends AppRouteRecordRaw {
    styles?: any;
}

export interface userinfo {
    token?: string;
}
