export class ClientConfig {
    constructor(currentConfig, previousConfig) {
        this.currentConfig = currentConfig;
        this.previousConfig = previousConfig;
        this.rootUrl = null;
        this.clientId = null;
        this.clientSecret = null;
        this.projectId = null;
        this.language = null;
        this.versionStatus = 'latest';
        this.pageIndex = 0;
        this.pageSize = 25;
        this.responseHandler = null;
        this.rootUrl = this.getValue((c) => c.rootUrl);
        this.clientId = this.getValue((c) => c.clientId);
        this.clientSecret = this.getValue((c) => c.clientSecret);
        this.projectId = this.getValue((c) => c.projectId);
        this.language = this.getValue((c) => c.language);
        this.versionStatus = this.getValue((c) => c.versionStatus);
        this.pageIndex = this.getValue((c) => c.pageIndex);
        this.pageSize = this.getValue((c) => c.pageSize);
        this.responseHandler = this.getValue((c) => c.responseHandler);
        while (this.rootUrl && this.rootUrl.substr(this.rootUrl.length - 1, 1) === '/') {
            this.rootUrl = this.rootUrl.substr(0, this.rootUrl.length - 1);
        }
    }
    toParams() {
        return {
            rootUrl: this.rootUrl,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            projectId: this.projectId,
            language: this.language,
            versionStatus: this.versionStatus,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            responseHandler: this.responseHandler
        };
    }
    getValue(getter) {
        let result = null;
        if (this.currentConfig) {
            result = getter(this.currentConfig);
        }
        if (this.previousConfig && !result) {
            result = getter(this.previousConfig);
        }
        return result || getter(this);
    }
}
