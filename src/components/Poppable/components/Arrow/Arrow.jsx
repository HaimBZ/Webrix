/**
 * Copyright (c) 2020, Amdocs Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, {useContext} from 'react';
import {intersection, midpoint} from 'utility/range';
import PoppableContext from '../../Poppable.context';
import classNames from 'classnames';
import './Arrow.scss';

export const ARROW_SIZE = 10;

const getTop = (tbr, rbr) => {
    const isn = intersection([tbr.top, tbr.bottom], [rbr.top, rbr.bottom]);
    if (isn.length === 0) {
        return tbr.top > rbr.bottom ? tbr.top - ARROW_SIZE * 2 : tbr.bottom;
    }
    return midpoint(isn) - ARROW_SIZE;
};

const getLeft = (tbr, rbr) => {
    const isn = intersection([tbr.left, tbr.right], [rbr.left, rbr.right]);
    if (isn.length === 0) {
        return tbr.left > rbr.right ? tbr.left - ARROW_SIZE * 2 : tbr.right;
    }
    return midpoint(isn) - ARROW_SIZE;
};

const ready = (tbr, rbr) => tbr.top !== undefined && rbr.top !== undefined;

const Arrow = () => {
    const {tbr, rbr} = useContext(PoppableContext);
    return ready(tbr, rbr) ? <div className={classNames('poppable-arrow', {
        up: tbr.top > rbr.bottom,
        down: tbr.bottom < rbr.top,
        left: tbr.left > rbr.right,
        right: tbr.right < rbr.left,
    })} style={{
        top: getTop(tbr, rbr),
        left: getLeft(tbr, rbr),
    }}/> : null;
};

export default Arrow;