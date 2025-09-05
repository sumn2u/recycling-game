import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import badges from "../../utils/badgeData";
import Button from "../Button";
import { ModalHeader, Spacer } from "../MasterCss";

const Wrapper = styled.div`
  background-image: linear-gradient(#060606, #08345c);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  min-height: 100vh;
  width: 100vw;
`;

const Input = styled.input`
  font-size: 24px;
  padding: 10px;
  margin: 20px 0;
  width: 300px;
`;

const ErrorText = styled.p`
  color: #ff4d4f;
  font-size: 18px;
  margin: 0;
`;

const CertificateBox = styled.div`
  border: 10px solid #f4a261;
  padding: 50px;
  text-align: center;
  background-color: #fff8e1;
  border-radius: 10px;

  img {
    width: 80px; /* smaller badge */
    margin-bottom: 20px;
  }
`;

const MessageBox = styled.div`
  ${(props) =>
    props.results &&
    `
    background-color: #f0f0f0;
    padding: 10px;
  `}
`;


const CertificateScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Safe defaults in case location.state is undefined
  const { count = 0, badgeGiven = 0 } = location.state || {};
  const badge = badges[badgeGiven] || badges[0];

  const [name, setName] = useState("");
  const [error, setError] = useState("");

 
  const getBadgeDataURI = async (badgePath) => {
    const response = await fetch(badgePath);
    const svgText = await response.text();
  // Properly handle Unicode characters
    const base64 = window.btoa(unescape(encodeURIComponent(svgText)));
    return "data:image/svg+xml;base64," + base64;
    };
  
  const handlePrint = async () => {
    if (!name.trim()) {
      setError("Please enter your name before printing.");
      return;
    }
    setError("");

    const badgePath = badge.src;
    const badgeDataURI = await getBadgeDataURI(badgePath);

    const today = new Date();
    const humanDate = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const printWindow = window.open("", "_blank");
    if (!printWindow) return; // safety check if popup blocked

    // Add styles
    const style = printWindow.document.createElement("style");
    style.textContent = `
      body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f4f4f4; }
      .certificate { border: 10px solid #f4a261; padding: 50px; background-color: #fff8e1; border-radius: 10px; }
      h1 { font-size: 48px; margin-bottom: 20px; }
      h2 { font-size: 32px; margin-bottom: 20px; }
      img { width: 80px; margin-bottom: 20px; }
      p { font-size: 24px; margin: 10px 0; }
    `;
    printWindow.document.head.appendChild(style);

    // Build certificate content
    const certificate = printWindow.document.createElement("div");
    certificate.className = "certificate";
    certificate.innerHTML = `
      <h1>Certificate of Achievement</h1>
      <h2>${name}</h2>
      <img id="badge" src="${badgeDataURI}" alt="Badge" />
      <p>Successfully sorted <strong>${count}</strong> items today!</p>
      <p>Issued by <strong>D.Waste</strong></p>
      <p>Date: <strong>${humanDate}</strong></p>
    `;
    printWindow.document.body.appendChild(certificate);

    // Wait for badge image to load before printing
    const img = printWindow.document.getElementById("badge");
    img.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };


  return (
    <Wrapper>
      <Spacer />
      <Spacer />
      <ModalHeader>Certificate of Achievement</ModalHeader>
      <Input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && <ErrorText>{error}</ErrorText>}
      {error && <Spacer />}
      <CertificateBox>
        <h2>{name || "Your Name"}</h2>
        <img src={badge.src} alt="Badge" />
        <p>Successfully sorted <strong>{count}</strong> items today!</p>
        <p>Issued by <strong>D.Waste</strong></p>
      </CertificateBox>
      <Spacer />
      
      <Button primary label="Print Certificate" handleClick={handlePrint} />
      <Spacer />
      <Button label="Back" handleClick={() => navigate(-1)} />
      <Spacer />
      <Spacer />
    </Wrapper>
  );
};

export default CertificateScreen;
