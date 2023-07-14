import React from "react";
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: [],
            references: 0
        }
        this.addField = this.addField.bind(this);
        this.submit = this.submit.bind(this);
        this.addRef = this.addRef.bind(this);
        this.deleteField = this.deleteField.bind(this);
        this.deleteRef = this.deleteRef.bind(this);
    }
    addField() {
        let type = document.getElementById("elms-values").value;
        let newArr = this.state.body;
        newArr.push({ type: type, value: "" })
        this.setState({ body: newArr });

    }
    submit() {
        let title = document.getElementById("title").value
        let author = document.getElementById("author").value || "John Doe"
        let date = document.getElementById("date").value
        let url = document.getElementById("url").value
        let body = document.getElementById("elms")
        let refs = document.getElementById("refs")
        let result = ` <header class="masthead" style="background-image: url('${url}')">
    <div class="container position-relative px-4 px-lg-5">
    <div class="row gx-4 gx-lg-5 justify-content-center">
    <div class="col-md-10 col-lg-8 col-xl-7">
    <div class="post-heading">
    <h1>${title}</h1> 
                            <span class="meta">
                                Posted by 
                                <a href="">${author}</a>on ${date}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
    </header>
    <!-- Post Content-->
        <article class="mb-4">
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-md-10 col-lg-8 col-xl-7">`;



        for (let i = 0; i < body.children.length; i++) {
            let e = body.children[i];
            result = result + `\n                    <${e.className}>${e.value}</${e.className}>`
        }

        if(refs.children.length != 0){
            result = result + `\n                    <h2 class="section-heading">References</h2>
            <ol class="ref">`
            for (let i = 0; i < refs.children.length; i++) {
                let e = refs.children[i];
                result = result + `\n                    <li>${e.value}</li>`
            }
            result = result + `\n                    </ol>`
        }

        result = result + `\n                    </div>
        </div>
    </div>
</article>`

        document.getElementById("result").value = result;
    }
    addRef() {
        this.setState({ references: this.state.references + 1 });
    }
    deleteField(){
        let e = document.getElementById("elms").lastChild;
        if(e){e.remove()}
    }
    deleteRef(){
        let e = document.getElementById("refs").lastChild;
        if(e){e.remove()}
    }
    render() {
        return (
            <div id="main">
                <h2>Header</h2>
                <input id="title" placeholder="title"></input>
                <input id="author" placeholder="author"></input>
                <input id="date" placeholder="date"></input>
                <input id="url" placeholder="thumbnail url"></input>
                <hr></hr>
                <h2>Body</h2>
                <div id="elms" className="sep">
                    {this.state.body.map((e) => {
                        return (<input className={e.type} placeholder={e.type}></input>)
                    })}
                </div>
                <div id="add-elm">

                    <button onClick={this.addField}>Add</button>
                    <select id="elms-values">
                        <option value="p">p</option>
                        <option value="h2">h2</option>
                        <option value="h3">h3</option>
                    </select>
                    <button id="delete-elm" onClick={this.deleteField}>Delete</button>
                </div>
                <hr />
                <h2>References</h2>
                <div id="refs" className="sep">
                    {Array.from({ length: this.state.references }, (_, index) => {
                        return <input key={index} />;
                    })}
                </div>
                <div id="add-ref">

                    <button onClick={this.addRef}>Add</button>
                    <button id="delete-ref" onClick={this.deleteRef}>Delete</button>
                </div>
                <hr />
                <button onClick={this.submit}>Submit</button>
                <textarea id="result" value="e"></textarea>
            </div>
        )
    }
}
export default Main;