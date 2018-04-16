import React from 'react';
import styled from 'styled-components';

import { convertObjToArr } from './helpers';

const Container = styled.div`

	display: grid;
	grid-template-columns: 1fr 3fr;

	.scrollspy {
		padding: 0 20px;
		position: relative;
		height: 500px;
		overflow-y: scroll;
	}
`

const Link = ({ href, text, active }) => (
	<a className={`list-group-item list-group-item-action ${active && 'active'}`} href={href} > {text}</a>
)

class Preview extends React.Component {

	state = {
		links: [
			{
				order: 1,
				href: '#list-item-1',
				active: true,
			},
			{
				order: 2,
				href: '#list-item-2',
				active: false,
			},
			{
				order: 3,
				href: '#list-item-3',
				active: false,
			},
			{
				order: 4,
				href: '#list-item-4',
				active: false,
			},
		],
		recentClick: false,
	}

	handleScroll = (e) => {

		const links = [...this.state.links];

		const containerScroll = this.refs['container'].scrollTop;
		const containerHeight = this.refs['container'].clientHeight;
		const containerScrollHeight = this.refs['container'].scrollHeight;

		let paraFound = false;

		if (containerScroll + containerHeight >= containerScrollHeight - 5) { // we have reached the bottom
			links.forEach(link => link.active = false);
			links[links.length - 1].active = true;
		} else {
			links
				.reverse() // search from bottom up
				.forEach((link) => {

					const { href } = link
					const elOffsetTop = this.refs[href].offsetTop;
					const elOffsetHeight = this.refs[href].offsetHeight;

					if (elOffsetTop < containerScroll + 5 && !paraFound) {
						link.active = true;
						paraFound = true;
					} else {
						link.active = false;
					}
				})
			links.reverse()
		}

		this.setState({ links })
	}

	render() {

		const { links } = this.state;

		return (
			<Container>
				<div id="list-example" className="list-group">
					{links.map(({ href, active }) => <Link key={href} href={href} text={href} active={active} />)}
				</div>
				<div ref="container" onScroll={this.handleScroll} data-spy="scroll" data-target="#list-example" data-offset="0" className="scrollspy scrollspy-example">
					<h4 ref="#list-item-1" id="list-item-1">Item 1</h4>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean venenatis et ipsum id dapibus. Vestibulum sit amet posuere odio, sit amet tincidunt mauris. Donec turpis massa, venenatis sed maximus quis, luctus a quam. In hac habitasse platea dictumst. Praesent nec justo egestas, feugiat nunc in, dapibus enim. Fusce finibus eros quis metus vulputate imperdiet. Morbi sed urna ut elit dignissim pharetra. Vivamus vitae massa quis nisi dignissim consequat ac vitae sapien.Donec placerat neque vitae blandit pretium. Donec risus metus, feugiat ac ultrices quis, sagittis eget mauris. Aenean lobortis posuere tellus vitae tincidunt. Sed cursus congue ipsum, nec laoreet elit. Sed a euismod erat, id fringilla odio. Donec ultricies commodo nibh, eu fringilla libero hendrerit id. Quisque fermentum ipsum sit amet risus tempus vulputate.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean venenatis et ipsum id dapibus. Vestibulum sit amet posuere odio, sit amet tincidunt mauris. Donec turpis massa, venenatis sed maximus quis, luctus a quam. In hac habitasse platea dictumst. Praesent nec justo egestas, feugiat nunc in, dapibus enim. Fusce finibus eros quis metus vulputate imperdiet. Morbi sed urna ut elit dignissim pharetra. Vivamus vitae massa quis nisi dignissim consequat ac vitae sapien.Donec placerat neque vitae blandit pretium. Donec risus metus, feugiat ac ultrices quis, sagittis eget mauris. Aenean lobortis posuere tellus vitae tincidunt. Sed cursus congue ipsum, nec laoreet elit. Sed a euismod erat, id fringilla odio. Donec ultricies commodo nibh, eu fringilla libero hendrerit id. Quisque fermentum ipsum sit amet risus tempus vulputate.</p>
					<h4 ref="#list-item-2" id="list-item-2">Item 2</h4>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean venenatis et ipsum id dapibus. Vestibulum sit amet posuere odio, sit amet tincidunt mauris. Donec turpis massa, venenatis sed maximus quis, luctus a quam. In hac habitasse platea dictumst. Praesent nec justo egestas, feugiat nunc in, dapibus enim. Fusce finibus eros quis metus vulputate imperdiet. Morbi sed urna ut elit dignissim pharetra. Vivamus vitae massa quis nisi dignissim consequat ac vitae sapien....</p>
					<h4 ref="#list-item-3" id="list-item-3">Item 3</h4>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean venenatis et ipsum id dapibus. Vestibulum sit amet posuere odio, sit amet tincidunt mauris. Donec turpis massa, venenatis sed maximus quis, luctus a quam. In hac habitasse platea dictumst. Praesent nec justo egestas, feugiat nunc in, dapibus enim. Fusce finibus eros quis metus vulputate imperdiet. Morbi sed urna ut elit dignissim pharetra. Vivamus vitae massa quis nisi dignissim consequat ac vitae sapien.Donec placerat neque vitae blandit pretium. Donec risus metus, feugiat ac ultrices quis, sagittis eget mauris. Aenean lobortis posuere tellus vitae tincidunt. Sed cursus congue ipsum, nec laoreet elit. Sed a euismod erat, id fringilla odio. Donec ultricies commodo nibh, eu fringilla libero hendrerit id. Quisque fermentum ipsum sit amet risus tempus vulputate....</p>
					<h4 ref="#list-item-4" id="list-item-4">Item 4</h4>
					<p>Donec placerat neque vitae blandit pretium. Donec risus metus, feugiat ac ultrices quis, sagittis eget mauris. Aenean lobortis posuere tellus vitae tincidunt. Sed cursus congue ipsum, nec laoreet elit. Sed a euismod erat, id fringilla odio. Donec ultricies commodo nibh, eu fringilla libero hendrerit id. Quisque fermentum ipsum sit amet risus tempus vulputate....</p>
					<p>Donec placerat neque vitae blandit pretium. Donec risus metus, feugiat ac ultrices quis, sagittis eget mauris. Aenean lobortis posuere tellus vitae tincidunt. Sed cursus congue ipsum, nec laoreet elit. Sed a euismod erat, id fringilla odio. Donec ultricies commodo nibh, eu fringilla libero hendrerit id. Quisque fermentum ipsum sit amet risus tempus vulputate....</p>
				</div>
			</Container>
		)
	}
}

export default Preview;