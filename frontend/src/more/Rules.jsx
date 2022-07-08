import React from 'react'
import "./Rules.css";
import Header from '../component/Home/Header';
import BottomTab from './BottomTab';
import MetaData from './Metadata';
import Footer from '../Footer';

const Rules = () => {
    return (
        <>
        <MetaData title="Pravila" />
        <Header />
        <div className='rules' style={{
            padding:"50px 30px",
            display:"flex",
            width:"95%",
            overflow:"hidden"
        }}>
            <ul className='rules'>
                <span style={{
                    color:"#000",
                    fontSize:"1.3rem",
                    fontWeight:"800",
                    fontFamily:"Roboto",
                }}>Neka pravila:</span>
                <li>1. Možete lako da vratite svoj proizvod.. Ali morate nam platiti troškove isporuke...</li>
                <li>2. Prvo morate da platite isporuku gotovinom kako bi preuzeli istu...</li>
                <li>3. Ne možete kupiti proizvode kojih nema na stanju...</li>
                <li>4. Možete kupiti bilo koje proizvode od nas ... trudimo se da damo najbolji kvalitet proizvoda ...</li>
                <li>5. Uskoro možete pronaći još novih funkcija u našem poslovanju...Naš tim programera uvek radi za vaše dobre usluge...</li>
                <li>6. Najzad hvala što ste posetili našu veb stranicu... Prijatan dan!</li>
            </ul>
        </div>
        <Footer />
        <BottomTab />
        </>
    )
}

export default Rules
