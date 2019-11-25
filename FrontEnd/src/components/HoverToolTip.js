import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

const HoverToolTip = ({ target, content, placement }) => {

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <div>
            <Tooltip placement={placement} isOpen={tooltipOpen} target={target} toggle={toggle}>
                {content}
            </Tooltip>
        </div>
    );
}

export default HoverToolTip;