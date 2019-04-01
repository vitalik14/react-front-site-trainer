import React from 'react';
import { PropTypes } from 'prop-types';

import Form from './Form/CommentsFormContainer';
import List from './List/CommentsListContainer';

const Comments = ({
  baseDomain,
  entityType,
  entityItemId,
  limit,
  showForm,
  wrapped,
  repliable,
  flexDirection,
}) => (
  <div style={{ display: 'flex', flexDirection }}>
    {showForm && <Form entityType={entityType} entityItemId={entityItemId} wrapped={wrapped} />}
    <List
      baseDomain={baseDomain}
      entityType={entityType}
      entityItemId={entityItemId}
      limit={limit}
      wrapped={wrapped}
      repliable={repliable}
    />
  </div>
);

Comments.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  entityType: PropTypes.oneOf(['video', 'recipe', 'comment', 'post', 'cmspost']).isRequired,
  entityItemId: PropTypes.number.isRequired,
  limit: PropTypes.number,
  showForm: PropTypes.bool,
  wrapped: PropTypes.bool,
  repliable: PropTypes.bool,
  flexDirection: PropTypes.string,
};

Comments.defaultProps = {
  limit: null,
  showForm: true,
  wrapped: false,
  repliable: false,
  flexDirection: 'column',
};

export default Comments;
