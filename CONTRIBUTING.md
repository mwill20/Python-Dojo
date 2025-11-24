# Contributing to Python-Dojo

Thank you for your interest in contributing to Python-Dojo! We welcome contributions from the community to help improve this project.

## Code of Conduct

This project adheres to the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). By participating, you are expected to uphold this code.

## How to Contribute

1. **Fork** the repository on GitHub
2. **Clone** your fork locally
3. Create a **branch** for your changes
4. Make your changes and **test** them
5. **Commit** your changes with a clear message
6. **Push** to your fork
7. Submit a **Pull Request**

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   cd server && pip install -r requirements.txt
   ```

2. Start the development servers:
   ```bash
   # Frontend
   npm run dev
   
   # Backend (in a separate terminal)
   cd server && uvicorn main:app --reload
   ```

## License

By contributing to Python-Dojo, you agree that your contributions will be licensed under the [Python Software Foundation License](LICENSE).

## Developer Certificate of Origin

This project uses a [Developer Certificate of Origin (DCO)](https://developercertificate.org/) to ensure that all contributions are properly attributed and licensed. By contributing to this project, you certify that:

1. The contribution was created in whole or in part by you
2. You have the right to submit the work under the project's license
3. You understand that your contributions are public and a record of the contribution (including all personal information you submit with it, including your sign-off) is maintained indefinitely and may be redistributed consistent with this project or the open source license(s) involved.

To indicate your agreement with the DCO, please sign your commits with:

```bash
git commit -s -m "Your commit message"
```

## Reporting Issues

Please use the [GitHub issue tracker](https://github.com/mwill20/Python-Dojo/issues) to report bugs or suggest new features. Include as much detail as possible to help us understand and reproduce the issue.
