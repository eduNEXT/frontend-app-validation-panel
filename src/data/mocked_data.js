export default [
  {
    course_name: 'Test Course #1',
    course_id: 'course-v1:edX+DemoX+Demo_Course',
    organization: 'Organization 1',
    categories: ['Category 1'],
    validation_body: 'Validator Body #1',
    validation_process_events: [
      {
        status: 'Submitted',
        created_at: '2023-08-01',
        reason: null,
        comment: 'This is the comment of the course author',
        user: 'Course Author 1',
      },
      {
        status: 'Disapproved',
        created_at: '2023-08-10',
        reason: 'Reason 1',
        comment: 'This is the comment of Validator 1',
        user: 'Validator 1',
      },
    ],
  },
  {
    course_name: 'Test Course #2',
    course_id: 'course-v1:edX+DemoX+Demo_Course',
    organization: 'Organization 2',
    categories: ['Category 2'],
    validation_body: 'Validator Body #2',
    validation_process_events: [
      {
        status: 'Submitted',
        created_at: '2023-08-10',
        reason: null,
        comment: 'This is another comment of the course author',
        user: 'Course Author 2',
      },
      {
        status: 'Approved',
        created_at: '2023-08-20',
        reason: null,
        comment: 'This is the comment of Validator 2',
        user: 'Validator 2',
      },
    ],
  },
  {
    course_name: 'Test Course #2',
    course_id: 'course-v1:edX+DemoX+Demo_Course',
    organization: 'Organization 2',
    categories: ['Category 3'],
    validation_body: 'Validator Body #2',
    validation_process_events: [
      {
        status: 'Submitted',
        created_at: '2023-08-10',
        reason: null,
        comment: 'This is another comment of the course author',
        user: 'Course Author 2',
      },
      {
        status: 'Approved',
        created_at: '2023-08-02',
        reason: null,
        comment: 'This is the comment of Validator 2',
        user: 'Validator 2',
      },
    ],
  },
  {
    course_name: 'Test Course #2',
    course_id: 'course-v1:edX+DemoX+Demo_Course',
    organization: 'Organization 2',
    categories: ['Category 2'],
    validation_body: 'Validator Body #2',
    validation_process_events: [
      {
        status: 'Submitted',
        created_at: '2023-08-10',
        reason: null,
        comment: 'This is another comment of the course author',
        user: 'Course Author 2',
      },
      {
        status: 'Draft',
        created_at: '2023-08-20',
        reason: null,
        comment: 'This is the comment of Validator 2',
        user: 'Validator 2',
      },
    ],
  },
];
