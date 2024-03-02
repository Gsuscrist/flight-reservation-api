export class Location{

    constructor(
        readonly country:string,
        readonly city:string,
        readonly airport:string,
        readonly terminal:string,
        readonly gate:string,
        readonly date:Date,
    ) {
    }
}