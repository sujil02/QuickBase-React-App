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
    reset = (field) => {
        localStorage.setItem("data", JSON.stringify(field))
        this.fields.choices =[]
        // this.fields = t
    }

    delete = (choiceName) => {
        this.fields.choices =this.fields.choices.filter(course => course !== choiceName)
        // this.fields = t
    }

    addChoice = (choice) => {
        let n = this.fields.choices.includes(choice);
        if (!n) {
            const myArrayString = JSON.stringify(this.fields.choices)
            let m = JSON.parse(myArrayString)
            m.push(choice)
            this.fields.choices = m;
            return this.fields.choices;
        } else {
            return this.fields.choices;
        }
    }
    saveField = (field, val) => {
        if (val != undefined)
            field.choices = val
        console.log(field)
        localStorage.setItem("data", JSON.stringify(field))
        return fetch(`http://www.mocky.io/v2/566061f21200008e3aabd919`, {
            method: 'POST',
            body: JSON.stringify(field),
            headers: {
                'content-type': 'application/json'
            }
        })
    }

}


