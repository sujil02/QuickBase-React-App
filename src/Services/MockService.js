import Fields from './Field';

export default class MockService {
    static myInstance = null;
    fields = Fields

    static getInstance() {
        if (MockService.myInstance == null) {
            MockService.myInstance =
                new MockService();
        }
        return this.myInstance;
    }

    getData = () => {
        const cachedHits = localStorage.getItem("data");
        if (cachedHits) {
            this.fields = JSON.parse(cachedHits)
            return this.fields
        } else {
            return this.getField(1)
        }
    }
    getField = () => {
        console.log("Fetched data")
        //let field = this.fields.find(field => field.id == 1)
        return this.fields
    }

    addChoice = (choice) => {
        let n = this.fields.choices.includes(choice);
        if (!n) {
            const myArrayString = JSON.stringify(this.fields.choices)
            let m = JSON.parse(myArrayString)
            m.push(choice)
            this.fields.choices = m;
            return this.fields;
        } else {
            return this.fields;
        }
    }
    saveField = (field) => {
        console.log(field)
        return fetch(`http://www.mocky.io/v2/566061f21200008e3aabd919`, {
            method: 'POST',
            body: JSON.stringify(field),
            headers: {
                'content-type': 'application/json'
            }
        })
    }

}


