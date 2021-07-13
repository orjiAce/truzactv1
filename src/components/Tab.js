import React, {useState, useEffect, useCallback} from 'react';
import TabPane from "./Tab-Pane";
import '../Style/Tab.scss'
import { TimelineLite} from "gsap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp, faCreditCard, faExchangeAlt} from "@fortawesome/free-solid-svg-icons";


const Tab = (props) => {
    const {children} = props;
    const [tabHeader, setTabHeader] = useState([]);
    const [childContent, setChildContent] = useState({});
    const [active, setActive] = useState("");
    let t1 = new TimelineLite();
    useEffect(() => {
        const headers = [];
        const childCnt = {};
        React.Children.forEach(children, (element) => {
            if (!React.isValidElement(element)) return;
            const {name} = element.props;
            headers.push(name);
            childCnt[name] = element.props.children;
        });
        setTabHeader(headers);
        setActive(headers[0]);
        setChildContent({...childCnt});
        //console.log(childCnt);

    }, [props, children]);



    const changeTab = useCallback((name) => {
        setActive(name);
    },[])

    useEffect(() => {


    }, [active]);
    return (
        <div className="tabs">
            <ul className="tab-header">
                {tabHeader.map((item) => (
                    <li
                        onClick={() => changeTab(item)}
                        key={item}
                        className={item === active ? "tab-active" : ""}
                    >
                        {item === 'Deposit' ? (
                            <div><FontAwesomeIcon icon={faArrowUp}/>&nbsp; {item}</div>) : item === 'Withdrawal' ?
                            (<div><FontAwesomeIcon icon={faCreditCard}/>&nbsp; {item}</div>) : item === 'Buy/Sell' ? (
                                <div><FontAwesomeIcon icon={faExchangeAlt}/> &nbsp; {item}</div>) : item}
                    </li>
                ))}
            </ul>
            <div className="tab-content">
                {Object.keys(childContent).map((key) => {
                    if (key === active) {
                        return <div className="tab-child">{childContent[key]}</div>;
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>
    );
};

Tab.propTypes = {
    children: function (props, propName, componentName) {
        const prop = props[propName];

        let error = null;
        React.Children.forEach(prop, function (child) {
            if (child.type !== TabPane) {
                error = new Error(
                    "`" + componentName + "` children should be of type `TabPane`."
                );
            }
        });
        return error;
    }
};

export default Tab;
