import * as Contensis from '../index';
import { getDefaultAuthenticateUrl, getDefaultConfig, getDefaultRequest, setDefaultSpy } from '../specs-utils.spec';
import fetch from 'cross-fetch';
import { ContentType } from 'contensis-core-api';

const Zengenti = { Contensis };
const global = window || this;
global.fetch = fetch;

describe('Content Type Operations', () => {

	describe('Get content type', () => {

		beforeEach(() => {
			setDefaultSpy(global, {
				name: { 'en-GB': 'contentType1' }
			} as Partial<ContentType>);

			Zengenti.Contensis.Client.defaultClientConfig = null;
			Zengenti.Contensis.Client.configure({
				fetchFn: global.fetch
			});
		});

		it('by id', async () => {
			let client = Zengenti.Contensis.Client.create(getDefaultConfig());

			let contentType = await client.contentTypes.get('movie');

			expect(global.fetch).toHaveBeenCalledTimes(2);

			expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

			expect((global.fetch as any).calls.mostRecent().args).toEqual([
				'http://my-website.com/api/management/projects/myProject/contenttypes/movie?versionStatus=published',
				getDefaultRequest()
			]);

			expect(contentType).not.toBeNull();
			expect(contentType.name['en-GB']).toEqual('contentType1');
		});

		it('with options', async () => {
			let client = Zengenti.Contensis.Client.create(getDefaultConfig());

			let contentType = await client.contentTypes.get({
				id: 'movie',
				versionStatus: 'latest',
				version: '2.3'
			});

			expect(global.fetch).toHaveBeenCalledTimes(2);

			expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

			expect((global.fetch as any).calls.mostRecent().args).toEqual([
				'http://my-website.com/api/management/projects/myProject/contenttypes/movie?version=2.3',
				getDefaultRequest()
			]);

			expect(contentType).not.toBeNull();
			expect(contentType.name['en-GB']).toEqual('contentType1');
		});
	});

	describe('List content types', () => {
		beforeEach(() => {
			setDefaultSpy(global, [{
				name: { 'en-GB': 'contentType1' }
			}, {
				name: { 'en-GB': 'contentType2' }
			}] as Partial<ContentType>[]);

			Zengenti.Contensis.Client.defaultClientConfig = null;
			Zengenti.Contensis.Client.configure({
				fetchFn: global.fetch
			});
		});

		it('With default options', async () => {
			let client = Zengenti.Contensis.Client.create(getDefaultConfig());
			let contentTypes = await client.contentTypes.list();

			expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

			expect((global.fetch as any).calls.mostRecent().args).toEqual([
				'http://my-website.com/api/management/projects/myProject/contenttypes?versionStatus=published',
				getDefaultRequest()
			]);

			expect(contentTypes).not.toBeNull();
			expect(contentTypes.length).toEqual(2);
			expect(contentTypes[1].name['en-GB']).toEqual('contentType2');
		});

		it('With specific options', async () => {
			let client = Zengenti.Contensis.Client.create(getDefaultConfig());
			let contenttypes = await client.contentTypes.list({
				versionStatus: 'latest',
				dataFormat: 'entry'
			});

			expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

			expect((global.fetch as any).calls.mostRecent().args).toEqual([
				'http://my-website.com/api/management/projects/myProject/contenttypes?dataFormat=entry',
				getDefaultRequest()
			]);

			expect(contenttypes).not.toBeNull();
			expect(contenttypes.length).toEqual(2);
			expect(contenttypes[1].name['en-GB']).toEqual('contentType2');
		});
	});
});
