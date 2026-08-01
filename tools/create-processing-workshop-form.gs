/**
 * Run this function once.
 *
 * It creates:
 *   1. A published Google Form for the workshop interest list.
 *   2. A linked Google Sheet for responses.
 *
 * After it runs, open the execution log to get the form, edit, and sheet URLs.
 * There is no web-app deployment and no spreadsheet ID to configure.
 */
function createProcessingWorkshopInterestForm() {
  const title = 'Processing for AP CS A — Workshop Interest Form';

  const form = FormApp.create(title, true)
    .setDescription(
      'CC Fest is exploring a free, hands-on workshop for educators who want ' +
      'to use Processing to make AP Computer Science A more visual, creative, ' +
      'and project-driven.\n\n' +
      'Complete this short interest form to help shape the workshop schedule ' +
      'and curriculum. This is an interest form, not registration.'
    )
    .setConfirmationMessage(
      'Thanks for your interest in Processing for AP CS A. We will share dates ' +
      'and registration information when the workshop plan is ready.'
    )
    .setCollectEmail(false)
    .setLimitOneResponsePerUser(false)
    .setProgressBar(true)
    .setPublishingSummary(false)
    .setShowLinkToRespondAgain(false)
    .setAllowResponseEdits(true);

  form.addSectionHeaderItem()
    .setTitle('About you')
    .setHelpText('Tell us enough to understand who the workshop should serve.');

  form.addTextItem()
    .setTitle('Name')
    .setRequired(true);

  const emailValidation = FormApp.createTextValidation()
    .setHelpText('Enter a valid email address.')
    .requireTextIsEmail()
    .build();

  form.addTextItem()
    .setTitle('Email address')
    .setValidation(emailValidation)
    .setRequired(true);

  form.addTextItem()
    .setTitle('School or organization')
    .setHelpText('Optional');

  // No 'Student' option: this form collects name and email, and the workshop is for
  // educators. Keeping a student path here would mean collecting minors' contact
  // details with no parental-consent route.
  form.addMultipleChoiceItem()
    .setTitle('What is your role?')
    .setChoiceValues([
      'AP Computer Science A teacher',
      'Computer science teacher',
      'Arts or creative coding educator',
      'Instructional coach or administrator',
    ])
    .showOtherOption(true)
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('What courses do you teach?')
    .setHelpText('For example: AP CS A, Intro to Java, or Creative Coding.');

  form.addListItem()
    .setTitle('What time zone are you in?')
    .setChoiceValues([
      'Hawaii',
      'Alaska',
      'Pacific',
      'Mountain',
      'Central',
      'Eastern',
      'Atlantic',
      'UTC / GMT',
      'Europe / Africa',
      'Asia',
      'Australia / New Zealand',
      'Other',
    ])
    .setRequired(true);

  form.addSectionHeaderItem()
    .setTitle('Your experience')
    .setHelpText('No Processing experience is required.');

  form.addMultipleChoiceItem()
    .setTitle('What is your AP CS A teaching experience?')
    .setChoiceValues([
      'Planning to teach it',
      'First year',
      '2–4 years',
      '5 or more years',
      'I do not teach AP CS A',
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('What is your Processing experience?')
    .setChoiceValues([
      'New to Processing',
      'I have tried a few sketches',
      'I use it occasionally',
      'I use it regularly in teaching',
    ])
    .setRequired(true);

  form.addSectionHeaderItem()
    .setTitle('Shape the workshop')
    .setHelpText('Your answers will help determine the format and curriculum.');

  form.addCheckboxItem()
    .setTitle('What would you most like help with?')
    .setChoiceValues([
      'Making AP Java concepts visual',
      'Creative projects and labs',
      'Objects and classes',
      'Loops and conditionals',
      'Arrays, ArrayList, and 2D arrays',
      'Translating Processing code into standard AP Java',
      'Assessment, tracing, and AP-style questions',
    ])
    .showOtherOption(true)
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('Which workshop formats could work for you?')
    .setChoiceValues([
      'Four weekly live sessions',
      'Two longer live sessions',
      'One-day intensive',
      'Asynchronous materials',
      'A mix of live and asynchronous participation',
    ])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('When are you generally available?')
    .setChoiceValues([
      'Weekday mornings',
      'Weekday afternoons',
      'Weekday evenings',
      'Saturday mornings',
      'Saturday afternoons',
      'Sunday mornings',
      'Sunday afternoons',
    ])
    .showOtherOption(true)
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('What would make this workshop valuable to you?')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Do you have any access or participation needs we should consider?')
    .setHelpText('Optional');

  // Framed as an acknowledgement rather than a question: a required question with only
  // a 'yes' answer is not a real choice. The choice string must stay byte-identical to
  // the value posted by site/workshop.html, or Google silently drops the answer.
  form.addMultipleChoiceItem()
    .setTitle(
      'CC Fest will email you about this workshop, and only about this workshop, ' +
      'at the address above.'
    )
    .setChoiceValues([
      'Yes, you may email me about this workshop.',
    ])
    .setRequired(true);

  const responseSheet = SpreadsheetApp.create(
    'Processing for AP CS A — Interest Form Responses'
  );

  form.setDestination(
    FormApp.DestinationType.SPREADSHEET,
    responseSheet.getId()
  );

  const publishedUrl = form.getPublishedUrl();
  const editUrl = form.getEditUrl();
  const sheetUrl = responseSheet.getUrl();

  console.log('FORM TO SHARE OR EMBED: ' + publishedUrl);
  console.log('FORM EDITOR: ' + editUrl);
  console.log('RESPONSE SHEET: ' + sheetUrl);

  console.log(
    'BASIC EMBED CODE:\n' +
    '<iframe src="' + publishedUrl + '?embedded=true" ' +
    'width="100%" height="1500" frameborder="0" marginheight="0" ' +
    'marginwidth="0">Loading…</iframe>'
  );

  return {
    publishedUrl: publishedUrl,
    editUrl: editUrl,
    responseSheetUrl: sheetUrl,
  };
}
