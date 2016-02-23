import React from 'react';

import DiffTable from '../../diff_table/index.jsx';

export default React.createClass({
  render() {
    const {file} = this.props.data;

    return (
      <div className="single slide">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              {
                file ?
                <DiffTable file={file} />
                :
                <div>click here to add file</div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
});
