/**
 * Layout
 * 2023-2023
 * v 0.0.3
 * 
 * */
// REACT
import React from "react";
// GATSBY
import { useStaticQuery, graphql } from "gatsby";
// APP
import { Legal, InfoFooter } from "../menu/menu_footer";
import { get_css_value } from "../../utils/tools";
import { ButtonPictoNav, ButtonNav } from "../hc";
// MEDIA
// import picto_instagram from 
import picto_linkedin from "../../../medias/picto/linkedin_jaune.svg";
import picto_youtube from "../../../medias/picto/youtube_jaune.svg";


const style_footer = {
	margin: "auto 0",
	display: "flex",
	alignItems: "center",
	justifyContent : "center",
	width: "100%",
	height: "50px",
	color: get_css_value("--color_text_light"),
	background: get_css_value("--color_footer"),
}

const style_cell = {
	paddingLeft : "0.5em",
	paddingRight : "0.5em",
	textTransform: "capitalize",
}



export function Footer() {
	const data = useStaticQuery(
    graphql`
			query {
				site {
					siteMetadata {
						title
						version
					}
				}
			}
    `
	)

	const year = new Date().getFullYear();
	return <div className="footer" style={style_footer}>
		<InfoFooter style={style_cell}>{data.site.siteMetadata.title} {year}</InfoFooter>

		<InfoFooter style={style_cell}>|</InfoFooter>
		<ButtonPictoNav
			src={picto_youtube}
			what="youtube"
			href="https://www.youtube.com/channel/UCT6WIz3SAJjtCANe86rP7Dw"
    />
		<InfoFooter style={style_cell}>|</InfoFooter>
		<ButtonPictoNav
			src={picto_linkedin}
			what="linkedin"
			href="https://www.linkedin.com/in/ivanjukanovic/"
    />
		<InfoFooter style={style_cell}>|</InfoFooter>
		<ButtonNav
			what="Edith Studio"
			href="https://www.edith-studio.fr/"
    />
		<InfoFooter style={style_cell}>|</InfoFooter>
		<Legal/>
	</div>
}