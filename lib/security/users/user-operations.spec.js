"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Contensis = require("../../index");
const specs_utils_spec_1 = require("../../specs-utils.spec");
const cross_fetch_1 = require("cross-fetch");
const Zengenti = { Contensis };
const global = window || this;
global.fetch = cross_fetch_1.default;
describe('User Operations', () => {
    describe('Get user', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, specs_utils_spec_1.defaultUsers[0]);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('current', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let user = await client.security.users.getCurrent();
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/@current`,
                specs_utils_spec_1.getDefaultRequest()
            ]);
            expect(user).not.toBeNull();
            expect(user.id).toEqual(specs_utils_spec_1.defaultUsers[0].id);
        });
        it('by id', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let user = await client.security.users.getById(specs_utils_spec_1.defaultUsers[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}`,
                specs_utils_spec_1.getDefaultRequest()
            ]);
            expect(user).not.toBeNull();
            expect(user.id).toEqual(specs_utils_spec_1.defaultUsers[0].id);
        });
        it('by username', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let user = await client.security.users.getByUsername(specs_utils_spec_1.defaultUsers[0].userName);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].userName}`,
                specs_utils_spec_1.getDefaultRequest()
            ]);
            expect(user).not.toBeNull();
            expect(user.userName).toEqual(specs_utils_spec_1.defaultUsers[0].userName);
        });
        it('by email', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let user = await client.security.users.getByEmail(specs_utils_spec_1.defaultUsers[0].email);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].email}`,
                specs_utils_spec_1.getDefaultRequest()
            ]);
            expect(user).not.toBeNull();
            expect(user.email).toEqual(specs_utils_spec_1.defaultUsers[0].email);
        });
    });
    describe('List users', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, {
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2,
                items: specs_utils_spec_1.defaultUsers
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('with default options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let users = await client.security.users.list();
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/security/users',
                specs_utils_spec_1.getDefaultRequest()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].userName).toEqual(specs_utils_spec_1.defaultUsers[1].userName);
        });
        it('with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let users = await client.security.users.list({
                q: 'content',
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['username']
            });
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/security/users?order=username&pageIndex=1&pageSize=50&q=content',
                specs_utils_spec_1.getDefaultRequest()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].userName).toEqual(specs_utils_spec_1.defaultUsers[1].userName);
        });
        it('with specific options and no query', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let users = await client.security.users.list({
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['username']
            });
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/security/users?order=username&pageIndex=1&pageSize=50',
                specs_utils_spec_1.getDefaultRequest()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].userName).toEqual(specs_utils_spec_1.defaultUsers[1].userName);
        });
    });
    describe('Create user', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, specs_utils_spec_1.defaultUsers[0]);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid user', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let user = await client.security.users.create(specs_utils_spec_1.defaultUsers[0]);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users`,
                specs_utils_spec_1.getDefaultRequest('POST', null, JSON.stringify(specs_utils_spec_1.defaultUsers[0]))
            ]);
            expect(user).not.toBeNull();
            expect(user.id).toEqual(specs_utils_spec_1.defaultUsers[0].id);
        });
        it('for valid suspended user', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let user = await client.security.users.create(specs_utils_spec_1.defaultUsers[0], true);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users?suspended=true`,
                specs_utils_spec_1.getDefaultRequest('POST', null, JSON.stringify(specs_utils_spec_1.defaultUsers[0]))
            ]);
            expect(user).not.toBeNull();
            expect(user.id).toEqual(specs_utils_spec_1.defaultUsers[0].id);
        });
        it('for valid unsuspended user', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let user = await client.security.users.create(specs_utils_spec_1.defaultUsers[0], false);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users`,
                specs_utils_spec_1.getDefaultRequest('POST', null, JSON.stringify(specs_utils_spec_1.defaultUsers[0]))
            ]);
            expect(user).not.toBeNull();
            expect(user.id).toEqual(specs_utils_spec_1.defaultUsers[0].id);
        });
    });
    describe('Update user', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, specs_utils_spec_1.defaultUsers[0]);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid user', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let user = await client.security.users.update(specs_utils_spec_1.defaultUsers[0]);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}`,
                specs_utils_spec_1.getDefaultRequest('PATCH', null, JSON.stringify(specs_utils_spec_1.defaultUsers[0]))
            ]);
            expect(user).not.toBeNull();
            expect(user.id).toEqual(specs_utils_spec_1.defaultUsers[0].id);
        });
    });
    describe('Update user password', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, null);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid user', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let options = {
                userId: specs_utils_spec_1.defaultUsers[0].id,
                new: 'pwd1',
                existing: 'pwd2'
            };
            const { userId } = options, requestBody = tslib_1.__rest(options, ["userId"]);
            let result = await client.security.users.updatePassword(options);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}/credentials/password`,
                specs_utils_spec_1.getDefaultRequest('POST', null, JSON.stringify(requestBody))
            ]);
            expect(result).toEqual(null);
        });
    });
    describe('Delete user', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, null);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid user', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let result = await client.security.users.delete(specs_utils_spec_1.defaultUsers[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}`,
                specs_utils_spec_1.getDefaultRequest('DELETE')
            ]);
            expect(result).toEqual(null);
        });
    });
    describe('Is user member of group', () => {
        describe('for a positive result', () => {
            beforeEach(() => {
                specs_utils_spec_1.setDefaultSpy(global, null);
                Zengenti.Contensis.Client.defaultClientConfig = null;
                Zengenti.Contensis.Client.configure({
                    fetchFn: global.fetch
                });
            });
            it('and valid user and group', async () => {
                let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
                let result = await client.security.users.userIsMemberOf(specs_utils_spec_1.defaultUsers[0].id, specs_utils_spec_1.defaultGroups[0].id);
                expect(global.fetch).toHaveBeenCalledTimes(2);
                expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
                expect(global.fetch.calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}/groups/${specs_utils_spec_1.defaultGroups[0].id}`,
                    specs_utils_spec_1.getDefaultRequest('HEAD')
                ]);
                expect(result).toBeTrue();
            });
        });
        describe('for a negative result', () => {
            beforeEach(() => {
                specs_utils_spec_1.setDefaultSpy(global, null, true);
                Zengenti.Contensis.Client.defaultClientConfig = null;
                Zengenti.Contensis.Client.configure({
                    fetchFn: global.fetch
                });
            });
            it('and valid user and group', async () => {
                let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
                let result = await client.security.users.userIsMemberOf(specs_utils_spec_1.defaultUsers[0].id, specs_utils_spec_1.defaultGroups[0].id);
                expect(global.fetch).toHaveBeenCalledTimes(2);
                expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
                expect(global.fetch.calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}/groups/${specs_utils_spec_1.defaultGroups[0].id}`,
                    specs_utils_spec_1.getDefaultRequest('HEAD')
                ]);
                expect(result).toBeFalse();
            });
        });
    });
    describe('Is user in groups', () => {
        describe('for a positive result', () => {
            beforeEach(() => {
                specs_utils_spec_1.setDefaultSpy(global, null);
                Zengenti.Contensis.Client.defaultClientConfig = null;
                Zengenti.Contensis.Client.configure({
                    fetchFn: global.fetch
                });
            });
            it('and valid user and group', async () => {
                let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
                let result = await client.security.users.userIsMemberOf(specs_utils_spec_1.defaultUsers[0].id, specs_utils_spec_1.defaultGroups[0].id, specs_utils_spec_1.defaultGroups[1].id);
                expect(global.fetch).toHaveBeenCalledTimes(2);
                expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
                expect(global.fetch.calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}/groups/${specs_utils_spec_1.defaultGroups[0].id},${specs_utils_spec_1.defaultGroups[1].id}`,
                    specs_utils_spec_1.getDefaultRequest('HEAD')
                ]);
                expect(result).toBeTrue();
            });
        });
        describe('for a negative result', () => {
            beforeEach(() => {
                specs_utils_spec_1.setDefaultSpy(global, null, true);
                Zengenti.Contensis.Client.defaultClientConfig = null;
                Zengenti.Contensis.Client.configure({
                    fetchFn: global.fetch
                });
            });
            it('and valid user and group', async () => {
                let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
                let result = await client.security.users.userIsMemberOf(specs_utils_spec_1.defaultUsers[0].id, specs_utils_spec_1.defaultGroups[0].id, specs_utils_spec_1.defaultGroups[1].id);
                expect(global.fetch).toHaveBeenCalledTimes(2);
                expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
                expect(global.fetch.calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}/groups/${specs_utils_spec_1.defaultGroups[0].id},${specs_utils_spec_1.defaultGroups[1].id}`,
                    specs_utils_spec_1.getDefaultRequest('HEAD')
                ]);
                expect(result).toBeFalse();
            });
        });
    });
    describe('Get user groups', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, {
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2,
                items: specs_utils_spec_1.defaultGroups
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('with default options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let groups = await client.security.users.getUserGroups(specs_utils_spec_1.defaultUsers[0].id);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}/groups`,
                specs_utils_spec_1.getDefaultRequest()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(specs_utils_spec_1.defaultGroups[1].name);
        });
        it('with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let groups = await client.security.users.getUserGroups({
                userId: specs_utils_spec_1.defaultUsers[0].id,
                includeInherited: true
            });
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}/groups?includeInherited=true`,
                specs_utils_spec_1.getDefaultRequest()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(specs_utils_spec_1.defaultGroups[1].name);
        });
    });
    describe('Perform user actions', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, null);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('suspend', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let result = await client.security.users.suspendUser(specs_utils_spec_1.defaultUsers[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}/actions`,
                specs_utils_spec_1.getDefaultRequest('POST', false, JSON.stringify({ type: 'suspend' }))
            ]);
            expect(result).toEqual(null);
        });
        it('unsuspend', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let result = await client.security.users.unsuspendUser(specs_utils_spec_1.defaultUsers[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}/actions`,
                specs_utils_spec_1.getDefaultRequest('POST', false, JSON.stringify({ type: 'unsuspend' }))
            ]);
            expect(result).toEqual(null);
        });
        it('unlock', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let result = await client.security.users.unlockUser(specs_utils_spec_1.defaultUsers[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}/actions`,
                specs_utils_spec_1.getDefaultRequest('POST', false, JSON.stringify({ type: 'unlock' }))
            ]);
            expect(result).toEqual(null);
        });
    });
});
