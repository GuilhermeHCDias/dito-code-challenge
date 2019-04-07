import React, { Component } from 'react';

import Calendar from '../../assets/img/calendar.svg';
import Check from '../../assets/img/check.svg';
import Clock from '../../assets/img/clock.svg';
import Money from '../../assets/img/money.svg';
import Place from '../../assets/img/place.svg';

import '../../assets/styles/components/timeline.css';

import { formatBrazilianDate, formatHourMinutes } from '../../services/utils';

export default class DitoTimeline extends Component {

    render() {
        const { payload } = this.props;

        return (
            <div className="dito-timeline-all-content">
                <div className="dito-timeline">
                </div>
                <div className="dito-timeline-cards-wrapper">

                    {Object.values(payload).map((transaction, index) => (
                        <div className="dito-timeline-card" key={index}>
                            <img src={Check} alt="dito check icon" className="dito-timeline-check-icon" />
                            <div className="arrow-left"></div>

                            <div className="dito-timeline-card-header">
                                <div className="dito-timeline-card-header-group">
                                    <img src={Calendar} alt="dito calendar" />
                                    <label>{formatBrazilianDate(new Date(transaction.date))}</label>
                                </div>
                                <div className="dito-timeline-card-header-group">
                                    <img src={Clock} alt="dito clock" />
                                    <label>{formatHourMinutes(new Date(transaction.date))}</label>
                                </div>
                                <div className="dito-timeline-card-header-group">
                                    <img src={Place} alt="dito location" />
                                    <label>{transaction.storeName}</label>
                                </div>
                                <div className="dito-timeline-card-header-group">
                                    <img src={Money} alt="dito money" />
                                    <label>{transaction.revenue}</label>
                                </div>
                            </div>

                            <div className="dito-timeline-card-body">
                                <div className="dito-timeline-card-row">
                                    <label className="dito-timeline-card-row-title">Produto</label>
                                    <label className="dito-timeline-card-row-title">Preço</label>
                                </div>
                                {transaction.products.map((product, index) => (
                                    <div className="dito-timeline-card-row" key={`row-${index}`}>
                                        <label className="dito-timeline-card-row-label">{product.product_name}</label>
                                        <label className="dito-timeline-card-row-label">{product.product_price}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
