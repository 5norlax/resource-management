import React, { Component } from 'react';
import axios from '../../api/index';
import { Redirect } from 'react-router-dom';
import { Container, Form, Button } from 'reactstrap';
import Header from '../../components/layout/Header/Header';
import AboutForm from '../../components/forms/AboutForm/AboutForm';
import SummaryForm from '../../components/forms/SummaryForm/SummaryForm';
import EducationForm from '../../components/forms/EducationForm/EducationForm';
import CertificationForm from '../../components/forms/CertificationForm/CertificationForm';
import ExperienceForm from '../../components/forms/ExperienceForm/ExperienceForm';
import ProjectForm from '../../components/forms/ProjectForm/ProjectForm';
import SkillForm from '../../components/forms/SkillForm/SkillForm';
import ResumeUpload from '../../components/forms/ResumeUpload/ResumeUpload';
import SectionHeader from '../../components/layout/SectionHeader/SectionHeader';
import DynamicSectionHeader from '../../components/layout/DynamicSectionHeader/DynamicSectionHeader';

class AddResource extends Component {
    state = {
        data: {
            "Id": "",
            "FirstName": "",
            "LastName": "",
            "Role": "",
            "Email": "",
            "Phone": "",
            "LinkedIn": "",
            "GitHub": "",
            "PersonalSite": "",
            "SummaryText": "",
            "Education": [],
            "Experience": [],
            "Project": [],
            "Certification": [],
            "Skills": []
        },
        submitted: false,
        resume: '',
        files: null
    };
    
    handleResume = (e) => {
        let resume = e.target.value;
        let files = e.target.files;
        this.setState({ resume, files });
    };

    handleCurrentPositionChange = (index, e) => {
        let currentPosition = this.state.currentPosition
        currentPosition[index] = !currentPosition[index]
        this.setState({ currentPosition })
    };

    handleChange = (e) => {
        let data = JSON.parse(JSON.stringify(this.state.data))
        data[e.target.name] = e.target.value
        this.setState({ data })
    };

    handleEducationChange = (index, e) => {
        let data = JSON.parse(JSON.stringify(this.state.data))
        data.Education[index][e.target.name] = e.target.value
        this.setState({ data })
    };

    handleCertificationChange = (index, e) => {
        let data = JSON.parse(JSON.stringify(this.state.data))
        data.Certification[index][e.target.name] = e.target.value
        this.setState({ data })
    };

    handleExperienceChange = (index, e) => {
        let data = JSON.parse(JSON.stringify(this.state.data))
        data.Experience[index][e.target.name] = e.target.value
        this.setState({ data })
    };

    handleProjectChange = (index, e) => {
        let data = JSON.parse(JSON.stringify(this.state.data))
        data.Project[index][e.target.name] = e.target.value
        this.setState({ data })
    };

    handleSubmit = (e) => {
        e.preventDefault()
        const data = JSON.parse(JSON.stringify(this.state.data))
        axios.post(`api/resources`, { data })
            .then(res => {
                this.setState({ submitted: true })
                if (this.state.files) {
                    const formData = new FormData();
                    formData.append('resume', this.state.files[0]);
                    axios.post(`resources/${res.data.Id}/resume`, formData);
                }
            })
    };

    handleSkillsChange = (skills) => {
        let data = JSON.parse(JSON.stringify(this.state.data))
        data.Skills = skills
        this.setState({ data })
    };

    handleAddEducation = () => {
        let data = JSON.parse(JSON.stringify(this.state.data))
        data.Education.push(
            {
                "School": "",
                "Location": "",
                "GradDate": "",
                "Degree": "",
                "Major": "",
                "Minor": ""
            }
        )
        this.setState({ data })
    };

    handleRemoveEducation = (index) => {
        let data = JSON.parse(JSON.stringify(this.state.data))
        if (data.Education.length === 1 || data.Education.length === index) data.Education.pop()
        else data.Education = [...data.Education.slice(0, index), ...data.Education.slice(index + 1)]
        this.setState({ data })
    };

    handleAddCertification = () => {
        let data = JSON.parse(JSON.stringify(this.state.data))
        data.Certification.push(
            {
                "CertName": "",
                "CertDate": "",
                "CertAssociation": ""
            }
        )
        this.setState({ data })
    };

    handleRemoveCertification = (index) => {
        let data = JSON.parse(JSON.stringify(this.state.data))
        if (data.Certification.length === 1 || data.Certification.length === index) data.Certification.pop()
        else data.Certification = [...data.Certification.slice(0, index), ...data.Certification.slice(index + 1)]
        this.setState({ data })
    };

    handleAddExperience = () => {
        let data = JSON.parse(JSON.stringify(this.state.data))
        data.Experience.push(
            {
                "JobTitle": "",
                "JobOrg": "",
                "JobStartDate": "",
                "JobEndDate": "",
                "JobInfo": ""
            }
        )
        this.setState({ data })
    };

    handleRemoveExperience = (index) => {
        let data = JSON.parse(JSON.stringify(this.state.data))
        if (data.Experience.length === 1 || data.Experience.length === index) data.Experience.pop()
        else data.Experience = [...data.Experience.slice(0, index), ...data.Experience.slice(index + 1)]
        this.setState({ data })
    };
    
    handleAddProject = () => {
        let data = JSON.parse(JSON.stringify(this.state.data))
        data.Project.push(
            {
                "ProjName": "",
                "ProjDate": "",
                "ProjAssociation": "",
                "ProjInfo": ""
            }
        )
        this.setState({ data })
    };

    handleRemoveProject = (index) => {
        let data = JSON.parse(JSON.stringify(this.state.data))
        if (data.Project.length === 1 || data.Project.length === index) data.Project.pop()
        else data.Project = [...data.Project.slice(0, index), ...data.Project.slice(index + 1)]
        this.setState({ data })
    };

    render() {
        return this.state.submitted ? <Redirect to="/resources" /> : (
            <div>
                
                <Header name={'Add Resource Form'} />
                <Container className="ResourceForm">
                    <Form onSubmit={this.handleSubmit}>
                        <SectionHeader name="About" />
                        <AboutForm handleChange={this.handleChange} FirstName={this.state.data.FirstName} LastName={this.state.data.LastName} Role={this.state.data.Role}
                            Email={this.state.data.Email} Phone={this.state.data.Phone} LinkedIn={this.state.data.LinkedIn} 
                            GitHub={this.state.data.GitHub} PersonalSite={this.state.data.PersonalSite} />
                        <SectionHeader name="Resume" />
                        <ResumeUpload resume={this.state.resume} handleResume={this.handleResume} existingResume={this.state.existingResume}
                        id={this.state.data.Id} FirstName={this.state.data.FirstName} LastName={this.state.data.LastName} />
                        <SectionHeader name="Summary" />
                        <SummaryForm handleChange={this.handleChange} SummaryText={this.state.data.SummaryText} />
                        <DynamicSectionHeader name="Education" count={this.state.data.Education.length} addForm={this.handleAddEducation} />
                        {this.state.data.Education.map((element, index) =>
                            <EducationForm key={index} index={index} 
                            removeEducation={this.handleRemoveEducation} handleEducationChange={this.handleEducationChange}
                            School={element.School} Location={element.Location} Degree={element.Degree} 
                            Major={element.Major} Minor={element.Minor} GradDate={element.GradDate} />
                        )}
                        <DynamicSectionHeader name="Certifications" count={this.state.data.Certification.length} addForm={this.handleAddCertification} />
                        {this.state.data.Certification.map((element, index) =>
                            <CertificationForm key={index} index={index} 
                            removeCertification={this.handleRemoveCertification} handleCertificationChange={this.handleCertificationChange}
                            CertName={element.CertName} CertDate={element.CertDate} CertAssociation={element.CertAssociation} />
                        )}
                        <DynamicSectionHeader name="Experience" count={this.state.data.Experience.length} addForm={this.handleAddExperience} />
                        {this.state.data.Experience.map((element, index) =>
                            <ExperienceForm key={index} index={index} 
                            removeExperience={this.handleRemoveExperience} handleExperienceChange={this.handleExperienceChange}
                            JobTitle={element.JobTitle} JobOrg={element.JobOrg} JobStartDate={element.JobStartDate} 
                            JobEndDate={element.JobEndDate} JobInfo={element.JobInfo} />
                        )}
                        <DynamicSectionHeader name="Projects" count={this.state.data.Project.length} addForm={this.handleAddProject} />
                        {this.state.data.Project.map((element, index) =>
                            <ProjectForm key={index} index={index} 
                            removeProject={this.handleRemoveProject} handleProjectChange={this.handleProjectChange}
                            ProjName={element.ProjName} ProjDate={element.ProjDate} 
                            ProjAssociation={element.ProjAssociation} ProjInfo={element.ProjInfo} />
                        )}
                        <SectionHeader name="Skills" />
                        <SkillForm skills={this.state.data.Skills} handleSkillsChange={this.handleSkillsChange} />
                        <Button type="submit" className="blue-button col-md-12" color="primary">Submit Form</Button>
                    </Form>
                </Container>
            </div>
        );
    };
};

export default React.memo(AddResource);