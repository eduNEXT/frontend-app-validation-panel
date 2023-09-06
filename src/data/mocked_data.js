export default [
  {
    courseName: 'Test Course #1 Test Course #1 Test Course #1 Test Course #1',
    courseId: 'course-v1:org1+test-course-1 course-v1:org1+test-course-1 course-v1:org1+test-course-1',
    organization: 'Organization 1 Organization 1 Organization 1 Organization 1',
    categories: 'Category 1 Category 1 Category 1 Category 1',
    validationBody: 'Validator Body #1',
    validationProcessEvents: [
      {
        status: 'Submitted',
        createdAt: '2023-08-01',
        reason: null,
        comment: 'This is the comment of the course author 1',
        user: 'Course Author 1',
      },
      {
        status: 'Disapproved',
        createdAt: '2023-08-10',
        reason: 'Reason 1',
        comment: 'This is the comment of Validator 1',
        user: 'Validator 1',
      },
    ],
  },
  {
    courseName: 'Test Course #2 Test Course #2 Test Course #2 Test Course #2',
    courseId: 'course-v1:org2+test-course-2 course-v1:org2+test-course-2 course-v1:org2+test-course-2',
    organization: 'Organization 2 Organization 2 Organization 2 Organization 2',
    categories: 'Category 1 Category 1 Category 1 Category 1',
    validationBody: 'Validator Body #2',
    validationProcessEvents: [
      {
        status: 'Submitted',
        createdAt: '2023-08-10',
        reason: null,
        comment: 'This is another comment of the course author 2',
        user: 'Course Author 2',
      },
      {
        status: 'Approved',
        createdAt: '2023-08-20',
        reason: null,
        comment: 'This is the comment of Validator 2',
        user: 'Validator 2',
      },
    ],
  },
  {
    courseName: 'Test Course #3 Test Course #3 Test Course #3 Test Course #3',
    courseId: 'course-v1:org3+test-course-3 course-v1:org3+test-course-3 course-v1:org3+test-course-3',
    organization: 'Organization 3 Organization 3 Organization 3 Organization 3',
    categories: 'Category 3 Category 3 Category 3 Category 3',
    validationBody: 'Validator Body #3',
    validationProcessEvents: [
      {
        status: 'Submitted',
        createdAt: '2023-08-10',
        reason: null,
        comment: 'This is another comment of the course author 3',
        user: 'Course Author 3',
      },
    ],
  },
  {
    courseName: 'Test Course #4 Test Course #4 Test Course #4 Test Course #4',
    courseId: 'course-v1:org4+test-course-4 course-v1:org4+test-course-4 course-v1:org4+test-course-4',
    organization: 'Organization 4 Organization 4 Organization 4 Organization 4',
    categories: 'Category 4 Category 4 Category 4 Category 4',
    validationBody: 'Validator Body #4',
    validationProcessEvents: [
      {
        status: 'Submitted',
        createdAt: '2023-08-10',
        reason: null,
        comment: 'This is another comment of the course author 4',
        user: 'Course Author 4',
      },
      {
        status: 'Draft',
        createdAt: '2023-08-20',
        reason: null,
        comment: 'This is the comment of Validator 4',
        user: 'Validator 4',
      },
    ],
  },
  {
    courseName: 'Test Course #5 Test Course #5 Test Course #5 Test Course #5',
    courseId: 'course-v1:org5+test-course-5 course-v1:org5+test-course-5 course-v1:org5+test-course-5',
    organization: 'Organization 5 Organization 5 Organization 5 Organization 5',
    categories: 'Category 5 Category 5 Category 5 Category 5',
    validationBody: 'Validator Body #5',
    validationProcessEvents: [
      {
        status: 'Exempt',
        createdAt: '2023-08-10',
        reason: null,
        comment: 'This is another comment of the course author 5',
        user: 'Course Author 5',
      },
    ],
  },
];
