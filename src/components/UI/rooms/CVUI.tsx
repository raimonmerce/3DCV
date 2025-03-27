import {assets} from '../../../assets/assets'
import './CVUI.css'; 

export default function CVUI() {
  const handleDownload = (url: string, name: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = name; // The file name when downloaded
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  return (
    <div className="cv-container">
      <p className="cv-description">
        Choose the language to download my CV.
      </p>
      <div className="cv-columns">
        {/* English CV Column */}
        <div className="cv-column">
          <img
            src={assets.images.cvEng}
            alt="CVEng"
            className="cv-image"
            onClick={() => handleDownload(assets.pdf.cveng, 'RaimonMerce_CV_ENG.pdf')}
          />
          <button onClick={() => handleDownload(assets.pdf.cveng, 'RaimonMerce_CV_ENG.pdf')} className="cv-button">
            Download in English
          </button>
        </div>

        {/* Spanish CV Column */}
        <div className="cv-column">
          <img
            src={assets.images.cvEsp}
            alt="CVEsp"
            className="cv-image"
            onClick={() => handleDownload(assets.pdf.cvesp, 'RaimonMerce_CV_ESP.pdf')}
          />
          <button onClick={() => handleDownload(assets.pdf.cvesp, 'RaimonMerce_CV_ESP.pdf')} className="cv-button">
            Descargar en Español
          </button>
        </div>
      </div>
    </div>
  );
}
