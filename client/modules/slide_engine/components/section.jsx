import React from 'react';

import DiffTable from './diff_table/index.jsx';
import FileList from '/client/modules/slide_engine/components/file_list.jsx';
import EditTextBox from '/client/modules/slide_engine/components/edit_text_box.jsx';
import TextBox from '/client/modules/slide_engine/components/text_box.jsx';

const Section = ({files, section, sectionPosition, onSetSection, onRemoveSection, editMode}) => {
  let SectionComponent;

  if (section) {
    SectionComponent = SectionMapping[section.type];
  }

  return (
    <div className="slide-section">
      {
        section ?
          <SectionComponent editMode={editMode}
            section={section}
            onSetSection={onSetSection}
            onRemoveSection={onRemoveSection}
            files={files} /> :
          <EmptySection editMode={editMode}
            sectionPosition={sectionPosition}
            onSetSection={onSetSection} />
      }
    </div>
  );
};

const EmptySection = ({sectionPosition, onSetSection, editMode}) => {
  function setSection(type, e) {
    e.preventDefault();
    let sectionDoc = {
      type
    };

    onSetSection(sectionDoc, sectionPosition);
  }

  return (
    <div className="empty-section">
      {
        editMode ?
          <div className="add-section-tool">
            <a href="#"
              className="btn btn-md btn-secondary"
              onClick={setSection.bind(this, 'file')}>
              <i className="fa fa-file-code-o"></i>
              Add file
            </a>
            <a href="#"
              className="btn btn-md btn-secondary add-text-btn"
              onClick={setSection.bind(this, 'text')}>
              <i className="fa fa-file-text-o"></i>
              Add text
            </a>
          </div> :
          <h1>Empty section</h1>
      }
    </div>
  );
};

const FileSection = ({files, section, onRemoveSection, onSetSection, editMode}) => {
  return (
    <div className="file-section">
      {
        editMode ?
          <EditFileSection files={files}
            section={section}
            onSetSection={onSetSection}
            onRemoveSection={onRemoveSection} /> :
          <DiffTable section={section}
            onRemoveFile={onRemoveSection} />
      }
    </div>
  );
};

const EditFileSection = ({files, section, onSetSection, onRemoveSection}) => {
  let file = section.data;

  if (file) {
    return (
      <DiffTable section={section}
        onRemoveFile={onRemoveSection}
        editMode={true} />
    );
  } else {
    return (
      <FileList files={files}
        sectionPosition={section.position}
        onSetSection={onSetSection}
        onRemoveSection={onRemoveSection} />
    );
  }
};

const TextSection = ({section, onSetSection, onRemoveSection, editMode}) => {
  return (
    <div className="text-section">
      {
        editMode ?
          <EditTextBox section={section}
            onSetSection={onSetSection}
            onRemoveSection={onRemoveSection} /> :
         <TextBox text={section.data} />
      }
    </div>
  );
};

// Maps section types to corresponding components
const SectionMapping = {
  file: FileSection,
  text: TextSection
};

export default Section;
