import React from 'react';
import './DetailView.css';
import PokeList from '../PokeList';

const DetailView = props => {

  return (
    <section className="detail-view">
        {
            props.pokemon
            ?<img alt="detail-select" className='sprite-image' />
            :<p>Select a Pokemon for comparison</p>
        }
      <div className='data-wrapper'>
        <h1 className='data-name'></h1>
        <p className="data-char"></p>
      </div>
      <PokeList compare="true" />
    </section>
  )
}

export default DetailView;