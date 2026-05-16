import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

const FORMAT_OPTIONS = [
	{ name: 'Google Forms', value: 'google_form' },
	{ name: 'Formswrite Form (Native)', value: 'formswrite_form' },
	{ name: 'Moodle XML', value: 'moodle' },
	{ name: 'Canvas (QTI)', value: 'canvas' },
	{ name: 'Blackboard', value: 'blackboard' },
	{ name: 'Brightspace (D2L)', value: 'brightspace' },
	{ name: 'Schoology', value: 'schoology' },
	{ name: 'Sakai', value: 'sakai' },
	{ name: 'LearnDash', value: 'learndash' },
	{ name: 'Kahoot!', value: 'kahoot' },
	{ name: 'Quizizz', value: 'quizizz' },
	{ name: 'Blooket', value: 'blooket' },
	{ name: 'Gimkit', value: 'gimkit' },
	{ name: 'Socrative', value: 'socrative' },
	{ name: 'Wooclap', value: 'wooclap' },
	{ name: 'Quizalize', value: 'quizalize' },
	{ name: 'ClassMarker', value: 'classmarker' },
	{ name: 'Pear Assessment', value: 'pear_assessment' },
	{ name: 'QTI 2.1', value: 'qti_21' },
	{ name: 'QTI 2.2', value: 'qti_22' },
	{ name: 'GIFT (Moodle)', value: 'gift' },
	{ name: 'Aiken', value: 'aiken' },
	{ name: 'Cloze', value: 'cloze' },
	{ name: 'Word (.Docx)', value: 'word' },
	{ name: 'H5P', value: 'h5p' },
];

export class Formswrite implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Formswrite',
		name: 'formswrite',
		icon: 'file:formswrite.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Convert documents into quizzes and forms in 25+ formats',
		defaults: {
			name: 'Formswrite',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'formswriteApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.formswrite.com',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [{ name: 'Document', value: 'document' }],
				default: 'document',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['document'] } },
				options: [
					{
						name: 'Convert',
						value: 'convert',
						action: 'Convert a document to a quiz',
						description: 'Convert a Google Doc or file into a quiz in your chosen format',
						routing: {
							request: {
								method: 'POST',
								url: '/api/v1/convert',
							},
						},
					},
				],
				default: 'convert',
			},
			{
				displayName: 'Output Format',
				name: 'format',
				type: 'options',
				required: true,
				default: 'google_form',
				description:
					'Where to send the converted quiz. Pick Google Forms to create a live form in Drive, or an LMS / quiz platform to receive an importable file.',
				displayOptions: { show: { resource: ['document'], operation: ['convert'] } },
				options: FORMAT_OPTIONS,
				routing: {
					send: { type: 'body', property: 'format' },
				},
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'options',
				noDataExpression: true,
				default: 'google',
				description: 'Whether the input is a Google Doc URL or a publicly accessible file URL',
				displayOptions: { show: { resource: ['document'], operation: ['convert'] } },
				options: [
					{ name: 'File URL', value: 'file' },
					{ name: 'Google Doc URL', value: 'google' },
				],
			},
			{
				displayName: 'Google Doc URL or ID',
				name: 'documentId',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'https://docs.google.com/document/d/...',
				description:
					'A Google Doc, Sheet, or Slides URL — or just the document ID. The document must be shared with the Formswrite service account email (find it in Settings → Integrations).',
				displayOptions: {
					show: { resource: ['document'], operation: ['convert'], source: ['google'] },
				},
				routing: { send: { type: 'body', property: 'documentId' } },
			},
			{
				displayName: 'File URL',
				name: 'fileUrl',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'https://example.com/quiz.pdf',
				description:
					'Public HTTPS link to a PDF, DOCX, XLSX, PPTX, or image file (max 10 MB). Redirects are not followed — provide a direct link such as an S3 presigned URL.',
				displayOptions: {
					show: { resource: ['document'], operation: ['convert'], source: ['file'] },
				},
				routing: { send: { type: 'body', property: 'fileUrl' } },
			},
			{
				displayName: 'Quiz Name',
				name: 'documentName',
				type: 'string',
				default: '',
				description:
					"Optional name for the resulting quiz or export file. Defaults to the source document's title.",
				displayOptions: { show: { resource: ['document'], operation: ['convert'] } },
				routing: { send: { type: 'body', property: 'documentName' } },
			},
		],
	};
}
