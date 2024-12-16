import React from 'react';
import '../styles/Contact.css';
import Donne  from'../components/donne';


const Service = () => {
    return (
        <div>
            <div className='container'>
            <form>
            <div class="row">
               <div class="col-25">
                    <label for="fname">Nom</label>
               </div>
              <div class="col-75">
                  <input type="text" placeholder="Nom"  required />
              </div>
            </div>
            <div class="row">
               <div class="col-25">
                    <label for="fname">Prenom</label>
               </div>
              <div class="col-75">
                  <input type="text" placeholder="prenom"  required />
              </div>
            </div>
            <div class="row">
               <div class="col-25">
                    <label for="fname">Email</label>
               </div>
              <div class="col-75">
                  <input type="Mail" placeholder="Email"  required />
              </div>
            </div>
          
            <div class="row">
               <div class="col-25">
                    <label for="fname">Objectif</label>
               </div>
              <div class="col-75">
                  <input type="text" placeholder="objectif"  required />
              </div>
            </div>
            <div class="row">
               <div class="col-25">
                    <label for="fname">Description</label>
               </div>
              <div class="col-75">
                  <textarea type="description" placeholder="votre texte"  required />
              </div>
            </div>
          <div class="row">
                <button type="submit">Envoyé</button>
          </div>
        </form>
            
    </div>
           <div>
            <Donne/>
           </div>
                   
</div>
    );
};

export default Service;
