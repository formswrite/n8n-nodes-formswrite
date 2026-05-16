# n8n-nodes-formswrite

This is an n8n community node that lets you convert documents into ready-to-use quizzes and forms in 25+ formats — Google Forms, Moodle, Kahoot, Quizizz, Canvas, Blackboard, QTI, H5P, and more — directly inside your n8n workflows.

[Formswrite](https://formswrite.com) turns Google Docs, PDFs, Word, Excel, and PowerPoint files into structured quizzes for LMS platforms, game-based learning tools, and assessment systems.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

- [Installation](#installation)
- [Credentials](#credentials)
- [Operations](#operations)
- [Supported output formats](#supported-output-formats)
- [Example workflows](#example-workflows)
- [Compatibility](#compatibility)
- [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

The npm package name is `n8n-nodes-formswrite`.

## Credentials

You need a Formswrite Auth Token to use this node.

1. Sign in to [Formswrite](https://formswrite.com) (or create a free account)
2. Open **Dashboard → Settings → API**
3. Click **Generate Auth Token** and copy the token
4. In n8n, create a new **Formswrite API** credential and paste the token into the **Auth Token** field

The token is long-lived — you only need to do this once.

## Operations

This release ships with one resource and one operation:

### Document → Convert

Converts a source document (Google Doc URL or any public HTTPS file URL) into a quiz in your chosen format.

**Inputs**

- **Output Format** — pick one of 25 supported formats (see below)
- **Source** — either a Google Doc URL / ID, or a publicly accessible file URL (one at a time)
- **Quiz Name** *(optional)* — defaults to the source document's title

**Outputs**

| Field | Description |
| --- | --- |
| `success` | Whether the conversion completed successfully |
| `formId` / `formUrl` / `directFormUrl` | For native targets (Google Forms, Formswrite Form) |
| `downloadUrl` | Time-limited download URL for importable file targets |
| `expiresAt` | When the download URL stops working |
| `exportId` | Internal export identifier |

## Supported output formats

| Category | Formats |
| --- | --- |
| **Form & survey** | Google Forms, Formswrite Form (native), Word (.docx) |
| **LMS (importable files)** | Moodle XML, Canvas (QTI), Blackboard, Brightspace (D2L), Schoology, Sakai, LearnDash |
| **Game-based learning** | Kahoot!, Quizizz, Blooket, Gimkit, Socrative, Wooclap, Quizalize |
| **Assessment platforms** | ClassMarker, Pear Assessment |
| **Standards-based** | QTI 2.1, QTI 2.2, GIFT (Moodle), Aiken, Cloze, H5P |

## Example workflows

- **Google Drive → Quiz file** — Watch a Drive folder for new lesson plans, convert each to Moodle XML, and email the result
- **Webhook → LMS import** — Accept a PDF upload via webhook, convert to QTI 2.1, and POST the file to your LMS API
- **Notion / Docs → Game-based** — Take meeting notes or training docs, convert to Kahoot or Quizizz, and post the play link to Slack
- **Bulk migration** — Iterate over a list of source URLs from a Google Sheet, batch-convert to your target LMS format, and store each result

### Limits & notes

- **File size:** 10 MB max for file URL inputs
- **Google Docs:** the document must be shared with your Formswrite service account email (find it in **Settings → Integrations**)
- **File URLs:** HTTP redirects are not followed — use direct links
- **Timing:** the action runs synchronously and waits for conversion to finish — long documents may take 30–60 seconds
- **`GOOGLE_AUTH_REQUIRED` error:** reconnect your Google account in the Formswrite web app, then retry

## Compatibility

Tested against n8n version 1.0+. Requires Node.js >= 22.

## Resources

- [Formswrite website](https://formswrite.com)
- [Formswrite API documentation](https://docs.formswrite.com/api/overview)
- [Formswrite pricing](https://formswrite.com/pricing)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Formswrite support](https://formswrite.com/contact-us)

## License

[MIT](LICENSE.md)
