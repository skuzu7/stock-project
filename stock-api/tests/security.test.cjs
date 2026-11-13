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
    const escaped = controller.replace(/[^a-zA-Z0-9]/g, '');
    const route = new RegExp('router\\.(?:post|put|delete)\\([\\s\\S]*?new ' + escaped + '\\(\\)\\.handle[\\s\\S]*?\\);', 'g');
    const blocks = [...routes.matchAll(route)];
    assert.ok(blocks.length > 0, 'missing route for ' + controller);
    const matching = blocks[blocks.length - 1][0];
    assert.match(matching, /isAuthenticated\s*,\s*requireAdmin\s*,/, 'missing admin guard: ' + controller);
  }
});

test('development SQLite database is never versioned', () => {
  assert.equal(fs.existsSync(path.join(root, 'prisma', 'dev.db')), false);
});

test('issued login JWTs are limited to one day', () => {
  assert.match(read('src/services/user/AuthUserService.ts'), /expiresIn:\s*["']1d["']/);
});
