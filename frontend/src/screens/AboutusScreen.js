import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import Creator from "../components/Creator"

const AboutusScreen = () => {
	const people = [
		{
			name: "Rajarshi",
			img: "https://scontent.fccu10-1.fna.fbcdn.net/v/t1.6435-1/p320x320/159862349_4066896653321708_8610620326343169551_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=7206a8&_nc_ohc=GLMFbHD7umAAX_3iDBC&_nc_ht=scontent.fccu10-1.fna&tp=6&oh=e99a7b60ab1697bdd3047dc77ea504c7&oe=60CE6EE2",
		},
		{
			name: "Reshab",
			img: "https://scontent.fccu10-1.fna.fbcdn.net/v/t1.6435-1/p320x320/45351650_501566073677104_6566972701724901376_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=7206a8&_nc_ohc=sr5mJzo05csAX9xRKXz&_nc_ht=scontent.fccu10-1.fna&tp=6&oh=f39e8a968e727e3e2490d2939f0dc2d0&oe=60CE04C6",
		},
		{
			name: "Sayandeep",
			img: "https://scontent.fccu10-1.fna.fbcdn.net/v/t1.6435-9/33074611_109299436620721_4263972303731163136_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=QAhFmWRa87MAX8V6a5H&_nc_ht=scontent.fccu10-1.fna&oh=ecc43c4694a85d1e9dc22e881e95253c&oe=60CCC29C",
		},
		{
			name: "Sourav",
			img: "https://scontent.fccu10-1.fna.fbcdn.net/v/t1.6435-1/s320x320/165277385_3808293815892352_5703735070284205032_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=7206a8&_nc_ohc=80QNcib1rhYAX_JSYDc&_nc_ht=scontent.fccu10-1.fna&tp=7&oh=03ec32af49c1dea01af677f066bf546e&oe=60CE66AD",
		},
		{
			name: "Swapnil",
			img: "https://lh3.googleusercontent.com/pw/ACtC-3ex5XZ6x0Kokvy-XaVoJkha8--x4yoYJG2SHWudSjf2le0jxKszKQ0W4j-NFKJL9KK-QjxYIBOi9v7SL28Q6xXTxdfZXcnm_IC1bBVEI0MDvJr1r2V1QpwQOv1Ro1Kqms0uZjjhjjI3Gj-2BH8byTBykQ=w1067-h1014-no",
		},
	]

	return (
		<Container
			style={{
				fontFamily: "Rubik, sans-serif",
			}}
		>
			<h1
				style={{
					textAlign: "left",
					marginTop: "100px",
				}}
			>
				ABOUT US
			</h1>
			<p style={{ marginTop: "60px", fontSize: "20px" }}>
				JUstintime is an E-Commerce Webiste created as a college project by a
				group of 5 students from Jadavpur University.
			</p>
			<p style={{ fontSize: "20px" }}>
				The idea behind this project is to provide a single-place for a person's
				requirements by offering a catalogue of <b>Products</b> like{" "}
				<i>(Fruits, Vegetables, Snacks, etc..)</i> and <b>Services</b> like{" "}
				<i>(Cleaning, Installation, Spa, etc..)</i>. The inspiration behind this
				project was to target the huge untapped potential in the Online Retail
				business in Kolkata especially in this Pandemic situation.
			</p>
			<p style={{ fontSize: "20px" }}>
				We have tried to create a smooth and professional User Experience for
				Customers looking to buy Products of book Services. Additionally we have
				also created an Admin's frontend to manage users, products/services,
				orders/bookings.
			</p>
			<center>
				<p style={{ marginTop: "50px" }}>
					This project is primarily built using MERN stack
				</p>
			</center>

			<h2
				style={{
					textAlign: "center",
					marginTop: "50px",
					marginBottom: "50px",
				}}
			>
				CREATORS
			</h2>

			<Row>
				{people.map((person) => (
					<Col>
						<Creator person={person} />
						<br />
					</Col>
				))}
			</Row>
		</Container>
	)
}

export default AboutusScreen
