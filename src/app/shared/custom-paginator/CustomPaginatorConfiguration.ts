import {MatPaginatorIntl} from '@angular/material';

export function CustomPaginator() {
    const customPaginatorIntl = new MatPaginatorIntl();

    customPaginatorIntl.itemsPerPageLabel = 'نمایش در هر صفحه';
    customPaginatorIntl.nextPageLabel = 'صفحه بعد';
    customPaginatorIntl.previousPageLabel = 'صفحه قبل';
    customPaginatorIntl.firstPageLabel = 'صفحه اول';
    customPaginatorIntl.lastPageLabel = 'صفحه آخر';
    customPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {

        if (length == 0 || pageSize == 0) {
            return `0 از ${length}`;
        }

        length = Math.max(length, 0);

        const startIndex = page * pageSize;

        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;

        return `${startIndex + 1} - ${endIndex} از ${length}`;
    };

    return customPaginatorIntl;
}
