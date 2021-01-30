export class UsersListDTO {
    constructor(
        public SearchValue: string,
        public CityId: string,
        public Gender?: number,
        public MateState?: number,
        public PageNumber?: number,
        public PageSize?: number,
        public NeedTotalCount?: boolean,
    ) {
    }
}
