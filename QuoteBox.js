class QuoteBox extends React.Component {


    state = {

        quote: 'Loading quote...',
        author: 'Loading author\'s name',

    }


    updateQuote = () => {
        let idx = null;

        fetch("https://type.fit/api/quotes")
        .then(response => response.json())
            .then(quotes => {
                const myQuotes = quotes.slice(0,100);
                const getIndex = () =>{
                    const randomIndex = Math.floor(Math.random() * myQuotes.length);
                    return idx !== randomIndex ? idx = randomIndex : getIndex();
                }
                getIndex();
               
                
                this.setState({
                 
                    quote: myQuotes[idx].text,
                    author: myQuotes[idx].author
                })
                
            });

        
    }

    componentDidMount(){
        this.updateQuote = this.updateQuote.bind(this);
        this.updateQuote();

    }

    newQuote = () => {
   
       this.updateQuote = this.updateQuote.bind(this);
       this.updateQuote();
    }

    tweetQuote = (e) =>{
        e.preventDefault();
        window.open(
            "https://twitter.com/intent/tweet?text=" + `${this.state.quote}%0D%0D${this.state.author}`,
             '_blank' 
           );
    }

    render() {   
       

        return(
            <div className="quoteBox center row">
            <div className="col m10 s6 offset-m1">
            <div className="card">
            <div className="card-content">
            <p className="quote card-title">{this.state.quote}</p>
            <p className="author">{this.state.author}</p>

            </div>
            <div className="card-action">
                <button className="btn green" onClick = {this.newQuote}>New Quote</button>
                <a href="" className="btn light-blue" onClick = {this.tweetQuote}>Tweet Quote</a>
            </div>
            </div>
            </div>
            </div>
        )
    }
}
const DOMdocument = document.querySelector('.quoteBox');
ReactDOM.render(<QuoteBox/>, DOMdocument);