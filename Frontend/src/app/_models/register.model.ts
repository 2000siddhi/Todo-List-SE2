export class Register{
    Email:string;
    Password:string;
    FirstName: string;
    LastName: string;
    Contact: number;
    Address: string;
    City: string;
    State: string;
    Zip: string;
    Country: string;

    constructor(username: string, password: string, fName: string, lName: string,
        contact: number, address: string, city: string, state: string, 
        zip: string, country: string){

        this.Email = username;
        this.Password = password;
        this.FirstName = fName;
        this.LastName = lName;
        this.Contact = contact;
        this.Address = address;
        this.City = city;
        this.State = state;
        this.Zip = zip;
        this.Country = country;
    }
}