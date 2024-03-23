/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

const menu: any = [
    {
        id   : 'home',
        title: 'Inicio',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/home'
    },
    {
        id   : 'companies',
        title: 'Empresas',
        type : 'basic',
        icon : 'mat_outline:feed',
        link : '/companies'
    },
    {
        id   : 'projects',
        title: 'Proyectos',
        type : 'basic',
        icon : 'mat_outline:supervised_user_circle',
        link : '/projects'
    },
    {
        id   : 'employees',
        title: 'Empleados',
        type : 'basic',
        icon : 'heroicons_outline:users',
        link : '/employees'
    }
];

/*
    {
        id   : 'forms',
        title: 'Formularios',
        type : 'basic',
        icon : 'heroicons_outline:users',
        link : '/forms'
    },
    {
        id   : 'signature',
        title: 'Firmas',
        type : 'basic',
        icon : 'heroicons_outline:users',
        link : '/signature'
    }
*/

export const defaultNavigation: FuseNavigationItem[] = menu;
export const compactNavigation: FuseNavigationItem[] = menu;
export const futuristicNavigation: FuseNavigationItem[] = menu;
export const horizontalNavigation: FuseNavigationItem[] = menu;
