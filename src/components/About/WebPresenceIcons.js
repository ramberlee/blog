import React from "react"
import theme from "../../theme/theme.yaml";
import { FaGithub, FaStackOverflow, FaLinkedin, FaYoutube, FaYCombinator } from 'react-icons/fa'
import config from "../../../content/meta/config";
import Codeforces from "../../images/svg-icons/codeforces.svg";
import Unsplash from "../../images/svg-icons/unsplash.svg";
import { disable } from "debug";

const WebPresenceIcons = () => {
    return (
        <div className="wrapper">
            <div className="icons">
                {config.authorGithub?<a href={config.authorGithub} target="_blank"><FaGithub/></a>:null}
                {config.authorStackOverflow?<a href={config.authorStackOverflow} target="_blank"><FaStackOverflow/></a>:null}
                {config.authorLinkedin?<a href={config.authorLinkedin} target="_blank"><FaLinkedin/></a>:null}
                {config.authorYCombinator?<a href={config.authorYCombinator} target="_blank"><FaYCombinator/></a>:null}
                {config.authorUnsplash?<a href={config.authorUnsplash} target="_blank"><Unsplash/></a>:null}
                {config.authorCodeforces?<a href={config.authorCodeforces} target="_blank"><Codeforces/></a>:null}
                {config.authorYoutube?<a href={config.authorYoutube} target="_blank"><FaYoutube/></a>:null}
            </div>
            <style jsx>{`
            .wrapper {
                text-align: center;
            }
            .icons {
                display: inline-block;
                font-size: 40px;
                :global(svg) {
                    margin: 10px;
                    fill: ${theme.color.brand.primary} !important;
                }
            }
            @from-width tablet {
                .icons {
                    font-size: 60px;
                }
            }
            @from-width desktop {
                .icons :global(a svg) {
                    margin-top: 20px;
                    transition: 500ms;
                }
                @media (hover: hover) {
                    .icons :global(a:hover svg) {
                        margin-top: 0px;
                        margin-bottom: 20px;
                        fill: ${theme.color.brand.primaryDark} !important;
                    }
                }
            }
            `}</style>
        </div>
    );
};

export default WebPresenceIcons;