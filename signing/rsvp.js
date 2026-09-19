/* Existing tested Google Sheets RSVP endpoint; browser cannot inspect opaque response. */
(() => {
'use strict';
const form=document.getElementById('directRsvpForm');
const button=document.getElementById('sendRsvp');
const status=document.getElementById('rsvpStatus');
const confirmation=document.getElementById('rsvpConfirm');
let sending=false;
form.addEventListener('submit',async event=>{
 event.preventDefault();
 if(sending||!form.reportValidity())return;
 const data=new URLSearchParams(new FormData(form));
 const name=(data.get('name')||'').trim();
 const attendance=data.get('attendance');
 const guests=data.get('guests');
 const message=(data.get('message')||'').trim();
 if(!name||name.length>150||message.length>1000||!["Yes, we'll be there!","Sorry, we can't make it"].includes(attendance)||!/^[1-5]$/.test(guests)){
  status.className='form-status wide error';status.textContent='Please check your RSVP details and try again.';return;
 }
 data.set('name',name);data.set('message',message);
 sending=true;button.disabled=true;button.textContent='Sending RSVP…';confirmation.hidden=true;
 status.className='form-status wide';status.textContent='Sending your response to our guest list…';
 try{
  await fetch(form.action,{method:'POST',mode:'no-cors',body:data,redirect:'follow',cache:'no-store'});
  status.className='form-status wide sent';status.textContent='Your RSVP was sent for processing ♡';confirmation.hidden=false;form.reset();button.textContent='RSVP sent ♡';
 }catch(_){status.className='form-status wide error';status.textContent='We could not send your RSVP. Please check your connection and try again.';button.textContent='Try again ♡';}
 finally{sending=false;button.disabled=false;}
},true);
})();