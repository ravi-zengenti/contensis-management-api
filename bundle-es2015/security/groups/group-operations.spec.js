import * as Contensis from '../../index';
import { defaultGroups, getDefaultAuthenticateUrl, getDefaultConfig, getDefaultRequest, setDefaultSpy, defaultUsers } from '../../specs-utils.spec';
import fetch from 'cross-fetch';
const Zengenti = { Contensis };
const global = window || this;
global.fetch = fetch;
describe('Group Operations', () => {
    describe('Get group', () => {
        beforeEach(() => {
            setDefaultSpy(global, defaultGroups[0]);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('by id', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let group = await client.security.groups.getById(defaultGroups[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].id}`,
                getDefaultRequest()
            ]);
            expect(group).not.toBeNull();
            expect(group.id).toEqual(defaultGroups[0].id);
        });
        it('by name', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let group = await client.security.groups.getByName(defaultGroups[0].name);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].name}`,
                getDefaultRequest()
            ]);
            expect(group).not.toBeNull();
            expect(group.name).toEqual(defaultGroups[0].name);
        });
    });
    describe('List groups', () => {
        beforeEach(() => {
            setDefaultSpy(global, {
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2,
                items: defaultGroups
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('with default options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let groups = await client.security.groups.list();
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/security/groups',
                getDefaultRequest()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(defaultGroups[1].name);
        });
        it('with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let groups = await client.security.groups.list({
                q: 'content',
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['name']
            });
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/security/groups?order=name&pageIndex=1&pageSize=50&q=content',
                getDefaultRequest()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(defaultGroups[1].name);
        });
        it('with specific options and no query', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let groups = await client.security.groups.list({
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['name']
            });
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/security/groups?order=name&pageIndex=1&pageSize=50',
                getDefaultRequest()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(defaultGroups[1].name);
        });
    });
    describe('Create group', () => {
        beforeEach(() => {
            setDefaultSpy(global, defaultGroups[0]);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid group', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let group = await client.security.groups.create(defaultGroups[0]);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups`,
                getDefaultRequest('POST', null, JSON.stringify(defaultGroups[0]))
            ]);
            expect(group).not.toBeNull();
            expect(group.id).toEqual(defaultGroups[0].id);
        });
    });
    describe('Update group', () => {
        beforeEach(() => {
            setDefaultSpy(global, defaultGroups[0]);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid group', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let group = await client.security.groups.update(defaultGroups[0]);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].id}`,
                getDefaultRequest('PUT', null, JSON.stringify(defaultGroups[0]))
            ]);
            expect(group).not.toBeNull();
            expect(group.id).toEqual(defaultGroups[0].id);
        });
    });
    describe('Delete group', () => {
        beforeEach(() => {
            setDefaultSpy(global, null);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid group', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let result = await client.security.groups.delete(defaultGroups[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].id}`,
                getDefaultRequest('DELETE')
            ]);
            expect(result).toEqual(null);
        });
    });
    describe('Add user to group', () => {
        beforeEach(() => {
            setDefaultSpy(global, null);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid group and user', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let result = await client.security.groups.addUser(defaultGroups[0].id, defaultUsers[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].id}/users/${defaultUsers[0].id}`,
                getDefaultRequest('PUT')
            ]);
            expect(result).toEqual(null);
        });
    });
    describe('Add users to group', () => {
        beforeEach(() => {
            setDefaultSpy(global, null);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid group and users', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            const userIds = [defaultUsers[0].id, defaultUsers[1].id];
            let result = await client.security.groups.addUsers(defaultGroups[0].id, userIds);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].id}/users`,
                getDefaultRequest('POST', false, JSON.stringify(userIds))
            ]);
            expect(result).toEqual(null);
        });
    });
    describe('Remove user from group', () => {
        beforeEach(() => {
            setDefaultSpy(global, null);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid group and user', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let result = await client.security.groups.removeUser(defaultGroups[0].id, defaultUsers[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].id}/users/${defaultUsers[0].id}`,
                getDefaultRequest('DELETE')
            ]);
            expect(result).toEqual(null);
        });
    });
    describe('Has user in group', () => {
        describe('for a positive result', () => {
            beforeEach(() => {
                setDefaultSpy(global, null);
                Zengenti.Contensis.Client.defaultClientConfig = null;
                Zengenti.Contensis.Client.configure({
                    fetchFn: global.fetch
                });
            });
            it('and valid group and user', async () => {
                let client = Zengenti.Contensis.Client.create(getDefaultConfig());
                let result = await client.security.groups.hasUser(defaultGroups[0].id, defaultUsers[0].id);
                expect(global.fetch).toHaveBeenCalledTimes(2);
                expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
                expect(global.fetch.calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/security/groups/${defaultGroups[0].id}/users/${defaultUsers[0].id}`,
                    getDefaultRequest('HEAD')
                ]);
                expect(result).toBeTrue();
            });
        });
        describe('for a negative result', () => {
            beforeEach(() => {
                setDefaultSpy(global, null, true);
                Zengenti.Contensis.Client.defaultClientConfig = null;
                Zengenti.Contensis.Client.configure({
                    fetchFn: global.fetch
                });
            });
            it('and valid group and user', async () => {
                let client = Zengenti.Contensis.Client.create(getDefaultConfig());
                let result = await client.security.groups.hasUser(defaultGroups[0].id, defaultUsers[0].id);
                expect(global.fetch).toHaveBeenCalledTimes(2);
                expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
                expect(global.fetch.calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/security/groups/${defaultGroups[0].id}/users/${defaultUsers[0].id}`,
                    getDefaultRequest('HEAD')
                ]);
                expect(result).toBeFalse();
            });
        });
    });
    describe('Add child group to group', () => {
        beforeEach(() => {
            setDefaultSpy(global, null);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid group and child group', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let result = await client.security.groups.addChildGroup(defaultGroups[0].id, defaultGroups[1].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].id}/groups/${defaultGroups[1].id}`,
                getDefaultRequest('PUT')
            ]);
            expect(result).toEqual(null);
        });
    });
    describe('Remove child group from group', () => {
        beforeEach(() => {
            setDefaultSpy(global, null);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid group and child group', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let result = await client.security.groups.removeChildGroup(defaultGroups[0].id, defaultGroups[1].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].id}/groups/${defaultGroups[1].id}`,
                getDefaultRequest('DELETE')
            ]);
            expect(result).toEqual(null);
        });
    });
    describe('Gets users in group', () => {
        beforeEach(() => {
            setDefaultSpy(global, {
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2,
                items: defaultUsers
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('by group id', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let users = await client.security.groups.getUsersByGroupId(defaultGroups[0].id);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].id}/users`,
                getDefaultRequest()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].userName).toEqual(defaultUsers[1].userName);
        });
        it('by group name', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let users = await client.security.groups.getUsersByGroupName(defaultGroups[0].name);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].name}/users`,
                getDefaultRequest()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].userName).toEqual(defaultUsers[1].userName);
        });
    });
    describe('Gets groups in group', () => {
        beforeEach(() => {
            setDefaultSpy(global, {
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2,
                items: defaultGroups
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('by group id', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let groups = await client.security.groups.getChildGroupsByGroupId(defaultGroups[0].id);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].id}/groups`,
                getDefaultRequest()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(defaultGroups[1].name);
        });
        it('by group name', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let users = await client.security.groups.getChildGroupsByGroupName(defaultGroups[0].name);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].name}/groups`,
                getDefaultRequest()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].name).toEqual(defaultGroups[1].name);
        });
    });
});
