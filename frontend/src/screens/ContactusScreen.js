import React from 'react'

const ContactusScreen = () => {
    return (
        <div class="container" style={{marginTop:'100px'}}>
		<div class="row">
			<div class="col-lg-5">
				<h2>LIVE SUPPORT</h2>
				<p><h4>24 hours | 7 days a week | 365 days a year Live Technical Support</h4></p>
				<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its content. The point of using Lorem Ipsum is that it hs a more-or-less normal distribution of letters. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
			</div>

			<div class="col-lg-2">
				<img src="https://raw.githubusercontent.com/SouravSaha1999/Mobile-o-Mania/master/ls.jpg" class="img-responsive" alt="Responsive image"/>
			</div>
		</div>

		<div class="row">
			<div class="col-lg-8">
				<h2>CONTACT US</h2>
				<form>
					<div class="form-group">
						<label for="name">Name :</label>
						<input type="text" name="name" class="form-control"/>
					</div>

					<div class="form-group">
						<label for="email">Email :</label>
						<input type="email" name="email" class="form-control"/>
					</div>

					<div class="form-group">
						<label for="msg">Message :</label>
						<textarea name="msg" class="form-control"></textarea>
					</div>

					<button type="button" class="btn btn-primary">Submit</button>
				</form>
			</div>

			<div class="col-lg-4">
				<h2>Company Information :</h2>
				<p>500 Mahatma Gandhi Rd,</p>
				<p>22-56-2-9 Sector-14 , Gurgaon,</p> 
				<p>INDIA</p>
				<p>Phone: +91-123-0000000</p>
				<p>Fax: (000) 000 00 00 0</p>
				<p>Email: info@mycompany.com</p>
				<p>Follow on: Facebook, Twitter</p>
			</div>
		</div>
	</div>
    )
}

export default ContactusScreen
