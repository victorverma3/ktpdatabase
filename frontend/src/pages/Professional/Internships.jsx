import { useEffect, useCallback, useState } from "react";
import { Breadcrumb, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;

const Internships = () => {
    const navigate = useNavigate();

    const [internshipResources] = useState([
        {
            header: "Job Websites",
            resources: [
                { name: "LinkedIn", url: "https://www.linkedin.com/jobs/" },
                {
                    name: "BU On-Campus Research Opportunities",
                    url: "https://www.bu.edu/urop/opportunities/on-campus-research/",
                },
                { name: "BU Connects", url: "https://buconnects.com/" },
                {
                    name: "Handshake",
                    url: "https://app.joinhandshake.com/login",
                },
                { name: "Indeed", url: "https://www.indeed.com/" },
                { name: "Simplify", url: "https://simplify.jobs/" },
                { name: "RippleMatch", url: "https://ripplematch.com/" },
            ],
        },
        {
            header: "GitHub Repos",
            resources: [
                {
                    name: "Mission-Peace Repo",
                    url: "https://github.com/mission-peace/interview",
                },
                {
                    name: "Pitt CSC Internship Repo",
                    url: "https://github.com/SimplifyJobs/Summer2025-Internships",
                },
            ],
        },
        {
            header: "Blogs and Videos",
            resources: [
                {
                    name: "Mock Technical Interview",
                    url: "https://www.youtube.com/watch?v=1qw5ITr3k9E&t=86s",
                },
            ],
        },

        {
            header: "Interview Prep",
            resources: [
                { name: "LeetCode", url: "https://leetcode.com/" },
                { name: "DataLemur", url: "https://datalemur.com/" },
                {
                    name: "GeeksForGeeks",
                    url: "https://www.geeksforgeeks.org/",
                },
            ],
        },
    ]);

    const getUser = useCallback(async () => {
        try {
            await axios.get(`${backend}/auth/google/login/success`, {
                withCredentials: true,
            });
        } catch (error) {
            navigate("/error/login");
        }
    }, [navigate]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="text-start p-3">Internships</h2>
            <Breadcrumb className="p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/professional">
                    Professional
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Internships</Breadcrumb.Item>
            </Breadcrumb>

            <div className="flex flex-wrap justify-around p-3">
                {internshipResources.map((section, idx) => (
                    <Card
                        key={idx}
                        className="m-4 w-96 text-start duration-200 hover:bg-purple-200 hover:scale-105"
                    >
                        <Card.Header as="h5">{section.header}</Card.Header>
                        <Card.Body>
                            {section.resources.map((resource, index) => (
                                <Card.Text key={index}>
                                    <a
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        {resource.name}
                                    </a>
                                </Card.Text>
                            ))}
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Internships;
