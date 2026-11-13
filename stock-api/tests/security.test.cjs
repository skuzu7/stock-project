const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (name) => fs.readFileSync(path.join(root, name), 'utf8');

test('inventory writes enforce authentication and admin authorization', () => {
  const routes = read('src/routes.ts');
  const writeControllers = [
    'CreateCategoryController',
    'EditCategoryController',
    'DeleteCategoryController',
    'CreateProductController',
    'EditProductController',
    'DeleteProductController',
    'SaleProductController',
  ];
  for (const controller of writeControllers) {
    const index = routes.indexOf('new ' + controller + '().handle');
    assert.ok(index >= 0, 'missing route for ' + controller);
    const start = routes.lastIndexOf('router.', index);
    assert.ok(start >= 0, 'missing route declaration: ' + controller);
    const matching = routes.slice(start, index);
    assert.match(matching, /isAuthenticated\s*,\s*requireAdmin\s*,/, 'missing admin guard: ' + controller);
  }
});

test('development SQLite database is never versioned', () => {
  assert.equal(fs.existsSync(path.join(root, 'prisma', 'dev.db')), false);
});

test('issued login JWTs are limited to one day', () => {
  assert.match(read('src/services/user/AuthUserService.ts'), /expiresIn:\s*["']1d["']/);
});
