import React from 'react'

class Footer extends React.Component {
    render(){
        return (
            <footer style={this.props.style}>
                <p className="love">Made with <span role="img" aria-label="heart">❤️</span> by <strong>Paola Andreu, Rémi Salmi and Guillaume Tessier</strong></p>
            </footer>
        );
    }
}

export default Footer