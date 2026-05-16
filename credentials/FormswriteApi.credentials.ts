import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class FormswriteApi implements ICredentialType {
	name = 'formswriteApi';

	displayName = 'Formswrite API';

	icon: Icon = 'file:../icons/formswrite.svg';

	documentationUrl = 'https://docs.formswrite.com/api/overview';

	properties: INodeProperties[] = [
		{
			displayName: 'Auth Token',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Generate one at Formswrite Dashboard → Settings → API → "Generate Auth Token".',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.formswrite.com',
			url: '/api/v1/zapier/is-valid',
			method: 'GET',
		},
	};
}
