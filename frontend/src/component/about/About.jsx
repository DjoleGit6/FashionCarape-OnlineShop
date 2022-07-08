import React from "react";
import { useSelector } from "react-redux";
import Footer from "../../Footer";
import Header from "../Home/Header";
import Loading from "../../more/Loader";
import MetaData from "../../more/Metadata";
import "./About.css";
import BottomTab from "../../more/BottomTab";
import about from "../../Assets/O nama.jpg";


const About = () => {
  const { loading } = useSelector(
    (state) => state.profile
  );
  return (
    <>
      {loading ? <Loading /> :
        <>
          <MetaData title="About" />
          <div>
            <Header />
            <div
              style={{
                width: "90%",
                margin: "0px auto",
              }}
            >
              <div className="about__page">
                {/* 1st verse */}
                <div className="row flex">
                  <div className="col__2">
                    <img src={about} alt="Img" />
                  </div>
                  <div className="col__2">
                    <div className="meta">
                      <span
                        style={{
                          fontSize: "40px",
                          fontWeight: "700",
                          lineHeight: "1.2",
                        }}
                      >
                        Dobrodošli na Fashion Čarape online prodavnicu
                      </span>
                      <p>
                        Fashion čarape je mlada porodična firma iz Niša koja teži da zadovolji svoje kupce visokim kvalitetom čarapa u svim veličinama i bojama, pažljivo odabranih da zadovolje svačiji ukus.
                      </p>
                      <p>
                        Ukoliko želite unihop sa dezenom, mikrofiberom, likrom, najlonke, grilonke, samodržeće, unihop za trudnice, dokolenice, popularne sokne Happy Socks, Scholl uloške, medicinske, pamučne ili dečije čarape – svratite kod nas i obezbedite svoj omiljeni par!
                      </p>
                      <p>
                        U bogatoj ponudi možete pronaći i marame različitih motiva, kao i fine ženske komplete (grudnjak i donji veš).
                      </p>
                      <p>
                        Tražite savršen poklon za praznik ili rođendan? Pomoći ćemo Vam da u specijalnim trenucima i događajima iznenadite sebi drage osobe!
                      </p>
                      <p>
                        Posetite našu radnju na prvom spratu i koračajte sa stilom u svojim novim čarapama!
                      </p>
                      <p>
                        Neka upravo Fashion čarape postanu Vaš nezaobilazni modni detalj u svakoj prilici!
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2nd verse */}
                <div className="second">
                  <div className="heading">
                    <h2>Šta mi obezbeđujemo ?</h2>
                  </div>
                  <div className="row flex">
                    <div className="col__3">
                      <div style={{
                        padding: "10px",
                        border: "1px solid #de3ac6",
                        minHeight: "230px"
                      }}>
                        <div className="flex align__items__center justify__content__center image">
                          <img src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-1.svg" alt="Img" />
                        </div>
                        <span>Najbolje cene & Ponude</span>
                        <p>
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority have suffered alteration in some
                          form
                        </p>
                      </div>
                    </div>
                    <div className="col__3">
                      <div style={{
                        padding: "10px",
                        border: "1px solid #de3ac6",
                        minHeight: "230px"
                      }}>
                        <div className="flex align__items__center justify__content__center image">
                          <img src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-2.svg" alt="Img" />
                        </div>
                        <span>Poverenje & Kvalitet</span>
                        <p>
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority have suffered alteration in some
                          form
                        </p>
                      </div>
                    </div>
                    <div className="col__3">
                      <div style={{
                        padding: "15px",
                        border: "1px solid #de3ac6",
                        minHeight: "230px"
                      }}>
                        <div className="flex align__items__center justify__content__center image">
                          <img src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-3.svg" alt="Img" />
                        </div>
                        <span>Brz sistem isporuke</span>
                        <p>
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority have suffered alteration in some
                          form
                        </p>
                      </div>
                    </div>


                    <div className="col__3">
                      <div style={{
                        padding: "15px",
                        border: "1px solid #de3ac6",
                        minHeight: "230px"
                      }}>
                        <div className="flex align__items__center justify__content__center image">
                          <img src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-4.svg" alt="Img" />
                        </div>
                        <span>Jednostavna usluga vraćanja</span>
                        <p>
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority have suffered alteration in some
                          form
                        </p>
                      </div>
                    </div>

                    <div className="col__3">
                      <div style={{
                        padding: "15px",
                        border: "1px solid #de3ac6",
                        minHeight: "230px"
                      }}>
                        <div className="flex align__items__center justify__content__center image">
                          <img src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-5.svg" alt="Img" />
                        </div>
                        <span>100% zadovoljstvo</span>
                        <p>
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority have suffered alteration in some
                          form
                        </p>
                      </div>
                    </div>

                    <div className="col__3">
                      <div style={{
                        padding: "15px",
                        border: "1px solid #de3ac6",
                        minHeight: "230px"
                      }}>
                        <div className="flex align__items__center justify__content__center image">
                          <img src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-6.svg" alt="Img" />
                        </div>
                        <span>Odlične dnevne ponude</span>
                        <p>
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority have suffered alteration in some
                          form
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
          <BottomTab />
        </>
      }
    </>
  );
};

export default About;
