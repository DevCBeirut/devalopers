import React from 'react';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';

import 'react-daterange-picker/dist/css/react-calendar.css'

import FormRow from "../../components/Row/FormRow";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import {AvForm} from "availity-reactstrap-validation";
import {Button, Input, CustomInput} from "reactstrap";
import btnsearch from "../../assets/images/btnsearch.png";
import DateRangePicker from "react-daterange-picker";
import SelectRow from "../../components/Select/SelectRow";
import CoreEngine from "../../core/CoreEngine";
import RequestEngine from "../../core/RequestEngine";
import {Link, withRouter} from "react-router-dom";
import loadingAction from "../../core/redux/actions/loadingAction";
import {connect} from "react-redux";
import FontAwesome from "react-fontawesome";
import {selectCountryList} from '../../core/countries';

import './style.scss'

const moment = extendMoment(originalMoment);
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;


const endOfMonth = moment().endOf('month');
class SideSearch extends CoreEngine {

    constructor(props) {
        super(props);
        this.state = {
            isOpen:false,
            value:moment.range(moment().startOf('month'), endOfMonth.clone()),
            lastValue:moment.range(moment().startOf('month'), endOfMonth.clone()),
            loading : false,
            istalent:false,
            fulltime:false,
            parttime:false,
            projectbasis:false,
            matchesAllSkills: false,
            excludeNoSalary: false,
            skill:"",
            isremote:false,
            skillslist:[],
            searchbyskill:[],
            minsalary:0,
            maxsalary:5000,
            isCountryCleared: true,
            country: '',
            talentsList: [],
            selectedtalent:[],
            matchesAllSkillsError:''
        }
        this.engine = new RequestEngine();
    }

    componentDidMount() {
        const {skills = [],istalent=false} = this.props
        this.setState({
            searchbyskill:skills,
            istalent:istalent
        })

        this.callSkillsList();
        this.callTalentTypeList();

    }
    async callSkillsList() {
        this.props.loadingAction(true);
        const response = await this.engine.getItem("skills");
        this.setState({
            loading: true,
        })
        if(response && response.status === 200){
            const data = response.data.data;
            let skillslist = []

            data.map(p =>
                skillslist.push( { value: p._id, label: p.name})
            )
            this.setState({
                    loading: false,
                    skillslist:skillslist
                }
            );
        }


        this.props.loadingAction(false);
    }
    async callTalentTypeList() {
        this.props.loadingAction(true);

        const responsetype = await this.engine.getItem("talenttype");
        if(responsetype && responsetype.status === 200){
            const data = responsetype.data.data;
            let talentsList = []
            // debugger
            data.map(p =>
                talentsList.push( { value: p._id, label: p.name,key:p._id})
            )
            this.setState({
                    loading: false,
                    talentsList:talentsList
                }
            );
        }


        this.props.loadingAction(false);
    }
    onToggle(){
        this.setState({
            isOpen:!this.state.isOpen
        })
    }

    onSelect(value,states){
        this.setState({
            value:value
        })
    }

    changeInputCheckbox = (event, stateName) => {
            this.setState({ [stateName]: event.target.checked },()=>this.triggerSearch());
    };

    changeInputCheckboxTalent = (event, stateName) => {
        // debugger
        let {selectedtalent} = this.state
        if(event.target.checked){
            // add talent
            selectedtalent.push(stateName)
        }else{
            //talent
            selectedtalent = selectedtalent.filter(i=>i!=stateName)
        }
        this.setState({ selectedtalent: selectedtalent },()=>this.triggerSearch());
    };

    changeInputSlider = (event, stateName) => {
        this.setState({ minsalary: event[0], maxsalary: event[1] });
    };

    afterChangeInputSlider = () => this.triggerSearch();

    changeInputSkills = (event, stateName) => {
        const {searchbyskill,skillslist} = this.state;
        searchbyskill.push(event);
        let newskillslist=skillslist.filter(i=>i.value!==event.value)
        this.setState({
            searchbyskill:searchbyskill,
            skillslist:newskillslist,
            matchesAllSkillsError:''
        },()=>this.triggerSearch())

    };

    triggerSearch(){
        const {searchbyskill, fulltime,
            parttime,
            projectbasis,isremote,minsalary,maxsalary,
            value, matchesAllSkills,excludeNoSalary, country,selectedtalent} = this.state

        this.props.searchAction(
            value.start,
            value.end,
            searchbyskill,
            fulltime,
            parttime,
            projectbasis,
            isremote,
            minsalary,
            maxsalary,
            matchesAllSkills,
            excludeNoSalary,
            country,
            selectedtalent
        )
    }

    clearAll(){
        let {searchbyskill,skillslist} = this.state;
        searchbyskill.map(item=>{
            skillslist.push(item); // remove
        })
        this.setState({
            value:moment.range(moment().startOf('month'), endOfMonth.clone()),
            lastValue:moment.range(moment().startOf('month'), endOfMonth.clone()),
            searchbyskill:[],
            skillslist:skillslist,
            loading : false,
            fulltime:false,
            parttime:false,
            matchesAllSkills:false,
            excludeNoSalary:false,

            projectbasis:false,
            skill:"",
            isremote:false,
            minsalary:0,
            maxsalary:5000,
            isCountryCleared: true,
            country: '',
            selectedtalent:[],
            ...this.state.talentsList.reduce( (obj, talent) => ({...obj, [talent.key]: false}), {} )
        },()=>{
            this.forceUpdate()
           // this.triggerSearch()
            this.props.searchAction(null, null, [])
        })

    }
    removeSkill(item){

        let {searchbyskill,skillslist} = this.state;
        skillslist.push(item); // remove
         searchbyskill=searchbyskill.filter(i=>i.value!==item.value) // add
        this.setState({
            searchbyskill:searchbyskill,
            skillslist:skillslist
        },()=>{
            this.forceUpdate()
            this.triggerSearch()
        })
    }
    submitDate = () => {
        this.setState({ lastValue: this.state.value })
        this.triggerSearch();
    }

    cancelDate = () => {

        this.setState({ value: this.state.lastValue,isOpen:false })

    }
    onCountryChange = selectedCountry => {
        this.setState({
            isCountryCleared: false,
            country: selectedCountry.value,
        }, this.triggerSearch)

    }
    render() {
        const {isOpen,value,fulltime,parttime,
            projectbasis,skill,skillslist,searchbyskill,isremote,minsalary,matchesAllSkills,excludeNoSalary,isCountryCleared,
            maxsalary,istalent,
            talentsList,matchesAllSkillsError} = this.state
        return (
            <div className="sidesearch col-md-3 bg-white">
                <AvForm className="form-horizontal" id="TypeValidation">

                    <div className="row">
                        <h3 className="ml-3 mb-3 font-weight-bold">Filter</h3>
                        <Button className="mb-3 btn text-primary bg-transparent" onClick={() => this.clearAll()} style={{border:0, boxShadow:"none"}}>Clear all filters</Button>
                    </div>
                    {!istalent && <><h6 className="mb-3 font-weight-bold ">Job Type</h6>
                    <ul className="jobtype">
                        <FormRow required={false} labelStyle={{fontSize:16}} row={true} label="Full Time" type="checkbox" name="fulltime" data={fulltime}   changeInput={this.changeInputCheckbox.bind(this)}   />
                        <FormRow required={false} labelStyle={{fontSize:16}} row={true} label="Part Time" type="checkbox" name="parttime" data={parttime}   changeInput={this.changeInputCheckbox.bind(this)}   />
                        <FormRow required={false} labelStyle={{fontSize:16}} row={true} label="Project Basis" type="checkbox" name="projectbasis" data={projectbasis}   changeInput={this.changeInputCheckbox.bind(this)}   />
                    </ul></>}

                    {istalent && <><h6 className="mb-3 font-weight-bold ">Talent Type</h6>
                    <ul className="jobtype">
                        {
                            talentsList.map( talentType => (
                                <FormRow key={talentType.key} required={false} labelStyle={{fontSize:16}} row={true} label={talentType.label} type="checkbox" name={talentType.key} data={this.state[talentType.key]} changeInput={this.changeInputCheckboxTalent.bind(this)}   />
                            ))
                        }
                    </ul></>}


                    <h6 className="mb-2 font-weight-bold ">Skills</h6>
                    <div className="align-items-center d-flex justify-content-between toggle-btn mb-2">
                        <span>Match all skills</span>
                        <label className="switch">
                            <Input type="checkbox" checked={matchesAllSkills} onChange={matchesAllSkills => {
                                if(searchbyskill.length > 0){
                                    this.setState({ matchesAllSkills: matchesAllSkills.target.checked },()=>this.triggerSearch())
                                }else{
                                    this.setState({ matchesAllSkillsError: "No skill is selected" })
                                }

                            } } />
                            <span className="slider round"></span>
                        </label>

                    </div>
                    <div>
                        <SelectRow
                            hidelabel={true}
                            isAlwaysCleared={true}
                            style={{background:"#F5F5F5",border:0}}
                            className="txtsearch mr-sm-2 p-2 m-2"
                            placeholder={"Search Skills"}
                            changeInput={this.changeInputSkills.bind(this)}
                            isSearchable={true}
                            name="skill"
                            defaultValue={skill}
                            data={skillslist}
                        />

                        {searchbyskill && searchbyskill.map((item,index)=>{
                        return <Button key={index} onClick={() => this.removeSkill(item)} className="btntag searchtag btn-secondary bg-white">{item.label}      <FontAwesome name="close"    size="1x" />
                        </Button>;
                        }
                        )}
                        {matchesAllSkillsError.length> 0 && (
                        <p className="error">{matchesAllSkillsError}</p>
                        )}
                    </div>


                    {!istalent && <>
                        <h6 className="mt-4 mb-3 font-weight-bold ">Salary Range</h6>
                        <div className="align-items-center d-flex justify-content-between toggle-btn mb-2">
                            <span>Exclude No Salary</span>
                            <label className="switch">
                                <Input type="checkbox" checked={excludeNoSalary} onChange={excludeNoSalary => this.setState({ excludeNoSalary: excludeNoSalary.target.checked },()=>this.triggerSearch())} />
                                <span className="slider round"></span>
                            </label>

                        </div>
                        <Range value={[minsalary, maxsalary]} onChange={this.changeInputSlider.bind(this)} onAfterChange={this.afterChangeInputSlider} min={0} max={5000} defaultValue={[minsalary, maxsalary]} tipFormatter={value => `${value}$`} />

                        <div className="row mb-2">
                            <div className="col-md-3 ">$0</div><div className="col-md-6 "/> <div className="col-md-3  text-right">$5000+</div>
                        </div>
                    </>}

                    {
                        (
                            <>
                                <h6 className="mb-3 font-weight-bold ">Country</h6>
                                <SelectRow
                                    hidelabel   ={true}
                                    required    ={true}
                                    name        ="country"
                                    changeInput ={this.onCountryChange}
                                    data        ={selectCountryList}
                                    isAlwaysCleared={isCountryCleared}
                                />
                            </>
                        )
                    }


                    {!istalent && (
                        <>
                            <h6 className="mb-1 mt-4 font-weight-bold ">Date Posted</h6>
                            <div onClick={()=>this.onToggle()} className="date-picker">
                                {value.start.format("YYYY-MM-DD")}
                                {" - "}
                                {value.end.format("YYYY-MM-DD")}
                                <FontAwesome name="calendar" className="ml-2" size="1x"/>
                            </div>
                        </>
                    )}

                    {isOpen && (
                        <div className="bg-white position-absolute borderwrap z-1 pb-3">
                            <DateRangePicker
                                value={value}
                                onSelect={(a,b)=>{
                                    this.onSelect(a,b)
                                }}
                                singleDateRange={true}
                            />

                            <button class="btn btn-sm mr-2" onClick={this.cancelDate}>Cancel</button>
                            <button class="btn btn-sm btn-secondary" onClick={this.submitDate}>Search</button>
                        </div>
                    )}

                    {!istalent && (
                        <>
                            <h6 className="mb-3 font-weight-bold mt-4">Options</h6>
                            <div className="align-items-center d-flex justify-content-between toggle-btn">
                                <span>Remote Only</span>
                                <label className="switch">
                                    <Input type="checkbox" checked={isremote}   onChange={isremote => {
                                        this.setState({ isremote:isremote.target.checked },()=>this.triggerSearch()
                                        )}} />

                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </>
                    )}
                </AvForm>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    loadingAction: (payload) => dispatch(loadingAction(payload))
});
export default connect(null, mapDispatchToProps)(withRouter(SideSearch));
