/**
 * GUI
 * 2023-2023
 * v 0.0.4
 * 
 * */
// REACT
import React, { FC, ReactNode, useState } from "react";
import { useContext } from "react";
// GATSBY
import { navigate } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
// APP
import tree from "./../../medias/tree.json";
import { Box } from "./hc";
import { get_css_value } from "../utils/hu";
import { RegionContext, HeaderContext } from "../context";

interface DesignProps {
  className_box?: string;
  style_box?: any;
  className_cell?: string;
  style_cell?: any;
}
///////////////////
// BUTTON
///////////////////
interface ButtonProps {
  what: string;
  to?: string;
  href?: string;
}

interface ButtonPictoProps extends  ButtonProps{
  src: string;
}

//////////////////////////
// NAVIGATION
////////////////////////



// BUttonPictoNav
/////////////////

export const ButtonPictoNav : FC<ButtonPictoProps> = ({ src, what, href }) => {
  let picto_container = {
    width: "30px",
    height: "40px",
  }

  let picto = {
    width: "25px",
    /* margin: auto; */
    transform: "translate(12%, 25%)",
  }

  return (
    <div style={picto_container}>
      <div style={picto}>
        <a href={href} target="_blank">
          <img src={src} alt={what} />
        </a>
      </div>
    </div>
  );
}


// ButtonNav
////////////////
// in progress
///////////////
export const ButtonNav : FC<ButtonProps> = ({what, to, href}) => {
  let button_style = {
    color: get_css_value("--color_text_light"),
    padding: 4,
    background: get_css_value("--color_button"),
    borderRadius: 4,
    fontSize: "1.5rem",
    cursor: "pointer",
    fontFamily: get_css_value("--font_title"),
    letterSpacing: "0.05em",
    fontVariantCaps: "all-petite-caps",
    textDecoration: 'none',
    width: "max-content",
  }

  return (
    <NavCell to={to} href={href} style={button_style}>
        {what}
    </NavCell>
  )
}


// ButtonCodeNav
////////////////
// in progress
///////////////
export const ButtonCodeNav : FC<ButtonProps> = ({what, to, href}) => {
  let button_style = {
    color: get_css_value("--color_text_light"),
    padding: 4,
    background: get_css_value("--color_button"),
    fontSize: "1.25rem",
    borderRadius: 4,
    cursor: "pointer",
    fontFamily: get_css_value("--font_title"),
    letterSpacing: "0.05em",
    fontVariantCaps: "all-petite-caps",
    textDecoration: 'none',
    width: "max-content",
  }

  const [is, set_is] = useState(false);
  const toggle_button = () => {
    if (is) {
      // button_style.background = "cyan";
      set_is(false);
    } else {
      // button_style.background = "";
      set_is(true);
    }
  }

  return (
    <NavCell to={to} href={href}>
        <code onClick={() => toggle_button()} style={button_style}>{what}</code>
    </NavCell>
  )
}



/////////////
// NAVIGATION
/////////////
interface NavProps extends DesignProps {
  children ?: any;
  to?: string;
  href?: string;
  className?: string;
  style?: any;
}

// NavCell
//////////
export const NavCell: FC<NavProps> = ({to, href, className, style, children}) => {
	function mouse_click(event: { preventDefault: () => void; }) {
		event.preventDefault();
    if(to !== undefined) {
      navigate(to);
    }
	}
  if(href !== undefined) {
    return <div className={className} style={style}>
      <a href={href} target="_blank" rel="noopener noreferrer" style={style}>{children}</a>  
      </div>
  } else 
	return <div className={className} style={style} onClick={mouse_click}>{children}</div>
}




// NavCellBox
//////////////
export const NavCellBox: FC<NavProps> = ({to, href, className_box, style_box, className_cell, style_cell, children}) =>{
	return <Box className={className_box} style={style_box}>
			<NavCell to={to} href={href} className={className_cell} style={style_cell}>{children}</NavCell>
		</Box>
}



// NavCellBoxImg
//////////////////
interface NavImgProps extends NavProps {
  img : IGatsbyImageData;
  alt: string;
}


export const NavCellBoxImg: FC<NavImgProps> = ({img, alt, to, href, className_box, style_box, className_cell, style_cell}) => {
  let size = get_css_value("--height_header_cell");
	if(size === undefined) {
		size = "100px";
	}
  size = size.slice(0,-2);

	return (
    <NavCellBox to={to} href={href} className_box={className_box} style_box={style_box} className_cell={className_cell} style_cell={style_cell}>
      <div style={{maxWidth: size+"px", maxHeight: size+"px"}}>
      <GatsbyImage image={img} alt={alt} placeholder="blurred" layout="constrained"/>
      </div>
	  </NavCellBox>
  )
}

interface ImgGuiProps {
  img: IGatsbyImageData;
  alt: string;
}

export const ImgGui: FC<ImgGuiProps> =({img, alt}) => {
  return <GatsbyImage image={img} alt={alt} placeholder="blurred" layout="constrained"/>

}

/////////////////////////////
/////////////////////////////
// DROPDOWN
////////////////////////////
/////////////////////////////


//////////////////
// DROPDOWN SIMPLE
//////////////////

interface DropdownProps extends NavProps {
  name?: string;
  is: boolean | null;
  set_is(action: boolean): void;
  offset? : string;
  value?: any;
}

export const Dropdown: FC<DropdownProps> = ({name,
                                            className_box, style_box, className_cell, style_cell, offset,
                                            is, set_is,  
                                            children}) => {
    const style_display = {
      display: "flex",
      flexDirection: "column",
      padding: offset + " 0",
    }

    function mouse_click(event: { preventDefault: () => void; }) {
      event.preventDefault();
      is ? set_is(false) : set_is(true); // context
    }

    // close the dropdown after use it
    function close(event: { preventDefault: () => void; }) {
      event.preventDefault();
      set_is(false);
    }

    return <Box className={className_box} style={style_box}>
      <div className={className_cell} style={style_cell} onClick={mouse_click}>{name}</div>
      {is ? 
      <div style={style_display} onClick={close}>
      {children}
      </div> : <></>}
    </Box>
}


export const DropdowRegions: FC<DropdownProps>= ({className_box, style_box, className_cell, style_cell, offset}) => {
	const { lang_db_is, set_lang_db_is } = useContext(HeaderContext);
	const { lang } = useContext(RegionContext);

	return <Dropdown 	name={tree[lang].lang[lang]}
										style_box={style_box} style_cell={style_cell} 
										offset={offset}
										is={lang_db_is} set_is={set_lang_db_is}>
		<SelectRegions  style_box={style_box} style_cell={style_cell} 
								    values={Object.values(tree[lang].lang)} keys={Object.keys(tree[lang].lang)} />
	</Dropdown>
}

interface RegionProps extends DesignProps {
  children?: ReactNode,
  index: number,
  keys: string[],
}

// we cannot use key for the props because it's react reserved word
export const Region:FC<RegionProps>= ({className_box, style_box, className_cell, style_cell, keys, index, children}) => {
	const { set_lang } = useContext(RegionContext);


	function mouse_click(event: { preventDefault: () => void; }) {
		event.preventDefault();
		set_lang(keys[index]);
	}

	return <Box className={className_box} style={style_box}>
		<div className={className_cell} style={style_cell} onClick={mouse_click}>
			{children}
		</div>
	</Box>
}

interface SelectRegionProps extends DesignProps {
  children?: ReactNode,
  keys: string[],
  values?: any
}

export const SelectRegions :FC<SelectRegionProps>= ({className_box, style_box, className_cell, style_cell, values, keys}) => {
	// we cannot use key for the props because it's react reserved word
	return <>
		{values.map((elem : any, key : number) => {
			return <Region className_box={className_box} style_box={style_box} 
										className_cell={className_cell} style_cell={style_cell}
										keys={keys} index={key}>
					{elem}
				</Region>
		})}
	</>	
}

//////////////////
//
// DON'T WORK YET
//
// DROPDOWN RADIO
//
// 
//
//////////////////


/*
export const DropdownRadio: FC<DropdownProps> = ({	name,
                                                    className_box, style_box, className_cell, style_cell, offset,
                                                    value, 
                                                    children}) => {
  // context
  const [toggle_is, set_toggle_is] = useContext(DropdownRadioContext);
  const checked = value === toggle_is;


  const style_display = {
    display: "flex",
    flexDirection: "column",
    padding: offset + " 0",
  }

  const style_input = {
    height:"0px",
    width: "0px",
    zindex:"1",
    opacity: "0",
    cursor: "pointer",
  }

  // close the dropdown after use it
  function close(event: { preventDefault: () => void; }) {
    event.preventDefault();
    set_toggle_is("");
  }
  
  return <Box className={className_box} style={style_box}>
			<label>
				<input
							style={style_input}
							// className="dropdown_input"
							id="radio_button"
							value={value}
							checked={checked}
							type="radio"
							onChange={({ target }) => {
								// some code if necessary
								set_toggle_is(target.value)}}
						/>
				<div className={className_cell} style={style_cell}>{name}</div>			
			</label>	
			{toggle_is === value ? <div onClick={close} style={style_display}>{children}</div> : <></>}
	</Box>
}
*/