import { compactNavigation } from 'app/mock-api/common/navigation/data';

export class Path{
    items: any;

    // eslint-disable-next-line @typescript-eslint/ban-types
    public getModule(): void {
        const str = window.location.pathname;
        const splitted = str.split('/');
        this.items = compactNavigation.filter(
            menu => menu.id === splitted[1]
        );
        return this.items[0].title;
    }
}
